package com.stackoverflow.team08.auth.config;

import com.stackoverflow.team08.auth.handler.OAuth2AuthenticationFailureHandler;
import com.stackoverflow.team08.auth.handler.OAuth2AuthenticationSuccessHandler;
import com.stackoverflow.team08.auth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .cors()
                .and()
                .headers().frameOptions().sameOrigin()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // 접근 권한 설정
                .authorizeRequests(auth -> auth
                        .antMatchers("/members/**").permitAll()
                        .antMatchers("/h2/**").permitAll()
                        .antMatchers("/test/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                // 성공 시 Handler
                .successHandler(oAuth2AuthenticationSuccessHandler)
                // 실패 시 Handler
                .failureHandler(oAuth2AuthenticationFailureHandler);

        return http.build();
    }

    // password encoding 을 위해 선언
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();  // (1-1)
//    }

}
