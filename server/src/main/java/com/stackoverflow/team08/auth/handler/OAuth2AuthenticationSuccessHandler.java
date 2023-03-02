package com.stackoverflow.team08.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.stackoverflow.team08.auth.entity.GithubEmailEntity;
import com.stackoverflow.team08.auth.jwt.service.JwtCreateService;
import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final Gson gson;

    private final OAuth2AuthorizedClientService authorizedClientService;

    private final RestTemplate restTemplate;

    private final MemberService memberService;

    private ObjectMapper objectMapper = new ObjectMapper();

    private final JwtCreateService jwtCreateService;

    public OAuth2AuthenticationSuccessHandler(Gson gson, OAuth2AuthorizedClientService authorizedClientService,
                                              RestTemplateBuilder restTemplateBuilder, MemberService memberService, JwtCreateService jwtCreateService) {
        this.gson = gson;
        this.authorizedClientService = authorizedClientService;
        this.restTemplate = restTemplateBuilder.build();
        this.memberService = memberService;
        this.jwtCreateService = jwtCreateService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("성공!");

        //String oauthId = authentication.getName();

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        log.info("token.getName() : {} ", token.getName());

        OAuth2User principal = token.getPrincipal();

        Map<String, Object> attributes = principal.getAttributes();

        String authorizedClientRegistrationId = token.getAuthorizedClientRegistrationId();

        log.info("로그인 플랫폼 : {}", authorizedClientRegistrationId);

        log.info("안에 있는 정보들 : {}", attributes);

        String email = (String) attributes.get("email");
        String imageUrl = "";
        // 로그인 플랫폼에 따른 분기
        if(authorizedClientRegistrationId.equals("github")){

            String data = getGitHubData(token);

            log.info("data : {} ", data);

            GithubEmailEntity[] dataArray = gson.fromJson(data, GithubEmailEntity[].class);

            List<GithubEmailEntity> entities = Arrays.stream(dataArray).collect(Collectors.toList());

            String userEmail = entities.get(0).getEmail();

            log.info("userEmail : {} ", userEmail);

            email = userEmail;
            imageUrl = (String) attributes.get("avatar_url");
        }else if(authorizedClientRegistrationId.equals("naver")){
            imageUrl = (String) attributes.get("profile_image");
        }else if(authorizedClientRegistrationId.equals("google")){
            imageUrl = (String) attributes.get("picture");
        }

        Optional<Member> optionalMember = memberService.existMember(email);
        // 유저가 없을 경우 기본적으로 정보를 저장 추가 정보를 받기위한 페이지로 이동
        if(optionalMember.isEmpty() || !optionalMember.get().isAuthentication()){
            // 랜덤 password 설정
            String uuid = UUID.randomUUID().toString();

            if(optionalMember.isEmpty()){
                // 임의 멤버 설정
                Member member = Member.builder()
                        .displayName((String) attributes.get("name"))
                        .email(email)
                        .password(uuid)
                        .memberImage(imageUrl)
                        .authentication(false)
                        .build();
                // 1차적으로 저장
                memberService.createMember(member);
            }

            // 추가정보를 위해서
            String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/test/user")
                    .build().toUriString();

            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");

            String responseEmail = objectMapper.writeValueAsString(email);

            response.getWriter().write(responseEmail);

            response.sendRedirect(uri);
        }
        // 유저가 있을 경우 원래 가려던 페이지로 이동
        else {
            Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            String accessToken =  jwtCreateService.delegateAccessToken(member);
            String refreshToken = jwtCreateService.delegateRefreshToken(member);

            response.setHeader("Authorization", "Bearer " + accessToken);
            response.setHeader("Refresh", refreshToken);
        }
    }
    
    // 따로 분리가 필요해보임
    public String getGitHubData(OAuth2AuthenticationToken authentication) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient("github", authentication.getName());
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(client.getAccessToken().getTokenValue());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange("https://api.github.com/user/emails", HttpMethod.GET, entity, String.class);
        return response.getBody();
    }
}
