package com.stackoverflow.team08.auth.config;

import com.google.gson.Gson;
import com.stackoverflow.team08.auth.handler.MemberAuthenticationFailureHandler;
import com.stackoverflow.team08.auth.handler.MemberAuthenticationSuccessHandler;
import com.stackoverflow.team08.auth.handler.OAuth2AuthenticationFailureHandler;
import com.stackoverflow.team08.auth.handler.OAuth2AuthenticationSuccessHandler;
import com.stackoverflow.team08.auth.jwt.JwtTokenizer;
import com.stackoverflow.team08.auth.jwt.filter.JwtAuthenticationProcessingFilter;
import com.stackoverflow.team08.auth.jwt.filter.JwtVerificationFilter;
import com.stackoverflow.team08.auth.jwt.service.JwtCreateService;
import com.stackoverflow.team08.auth.service.CustomOAuth2UserService;
import com.stackoverflow.team08.auth.utils.CustomAuthorityUtils;
import com.stackoverflow.team08.member.repository.MemberRepository;
import com.stackoverflow.team08.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final OAuth2AuthorizedClientService oAuth2AuthorizedClientService;
    private final RestTemplateBuilder restTemplateBuilder;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final JwtCreateService jwtCreateService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .cors(withDefaults())
                .headers().frameOptions().sameOrigin()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                // 접근 권한 설정
                .authorizeRequests(auth -> auth
                        .antMatchers(HttpMethod.PATCH,"/members/**","/answers/**","/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST,"/answers/**","/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE,"/members/**","/answers/**","/questions/**").hasRole("USER")
                        //.antMatchers("/h2/**").permitAll()
                        .antMatchers(HttpMethod.POST,"/auth/login/**").permitAll()
                        .anyRequest().permitAll()
                )
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                // 성공 시 Handler
                .successHandler(new OAuth2AuthenticationSuccessHandler(new Gson(),oAuth2AuthorizedClientService,restTemplateBuilder,memberService,jwtCreateService))
                // 실패 시 Handler
                .failureHandler(oAuth2AuthenticationFailureHandler);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Jwt 검증 필터 추가
    public class CustomFilterConfigurer  extends AbstractHttpConfigurer<CustomFilterConfigurer , HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter = new JwtAuthenticationProcessingFilter(authenticationManager, memberService);
            jwtAuthenticationProcessingFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationProcessingFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(jwtCreateService, memberService));
            jwtAuthenticationProcessingFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            // jwt 검증 필터 추가
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, customAuthorityUtils);

            builder
                    .addFilter(jwtAuthenticationProcessingFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationProcessingFilter.class);
        }
    }
}
