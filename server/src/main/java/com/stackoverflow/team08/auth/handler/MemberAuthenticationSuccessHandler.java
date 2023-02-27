package com.stackoverflow.team08.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackoverflow.team08.auth.jwt.service.JwtCreateService;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtCreateService jwtCreateService;

    private final MemberService memberService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("일반적인 로그인 성공");

        Member member = (Member)authentication.getPrincipal();

        log.info("로그인 한 유저 정보 : {} ", member.toString());

        // 로그인 할때 마다 새로운 토큰을 사용한다.
        String accessToken = jwtCreateService.delegateAccessToken(member);
        String refreshToken = jwtCreateService.delegateRefreshToken(member);

        Member findMember = memberService.findMemberToEmail(member.getEmail());

        findMember.setAuthentication(true);
        findMember.setRefreshToken(refreshToken);

        memberService.saveMember(findMember);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        // response displayName, id, email
        Member builder = Member.builder()
                .memberId(findMember.getMemberId())
                .displayName(findMember.getDisplayName())
                .email(findMember.getEmail())
                .build();
        ObjectMapper mapper = new ObjectMapper();
        String memberResponse = mapper.writeValueAsString(builder);
        response.getWriter().write(memberResponse);
    }
}
