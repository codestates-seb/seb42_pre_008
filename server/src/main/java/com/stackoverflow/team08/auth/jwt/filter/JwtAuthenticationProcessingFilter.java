package com.stackoverflow.team08.auth.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackoverflow.team08.auth.dto.LoginDto;
import com.stackoverflow.team08.auth.jwt.JwtTokenizer;
import com.stackoverflow.team08.auth.jwt.service.JwtCreateService;
import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.repository.MemberRepository;
import com.stackoverflow.team08.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtAuthenticationProcessingFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final MemberService memberService;


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        ObjectMapper mapper = new ObjectMapper();

        LoginDto loginDto = mapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        // entity 객체 get
        Member member = (Member) authResult.getPrincipal();

//        String accessToken = jwtCreateService.delegateAccessToken(member);
//        String refreshToken = jwtCreateService.delegateRefreshToken(member);

        Member findMember = memberService.existsMemberToFindByEmail(member.getEmail());


//        findMember.setRefreshToken(refreshToken);
//        findMember.setAuthentication(true);

//        memberRepository.save(findMember);
//
//        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }


}
