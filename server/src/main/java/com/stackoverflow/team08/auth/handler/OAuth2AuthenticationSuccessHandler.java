package com.stackoverflow.team08.auth.handler;

import com.stackoverflow.team08.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("성공!");

        String oauthId = authentication.getName();

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        OAuth2User principal = token.getPrincipal();

        Map<String, Object> attributes = principal.getAttributes();

        log.info("안에 있는 정보들 :{}", attributes);

        // 여기서 분기를 통해 회원가입을 했을 경우 메인 페이지로
        // 없을 경우 가입하는 화면으로 이동을 해줘야 할듯
        // 문제는 로그인 유저의 값을 어떻게 넘겨줘야 하는가
        // Dto를 JSON으로 바꿔서 줘야 할 것 같기는 하다.
        Member member = new Member();

        PrintWriter writer = response.getWriter();



        String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/test/user")
                .queryParam("oauthId", oauthId)
                .build().toUriString();

        response.sendRedirect(uri);
    }
}
