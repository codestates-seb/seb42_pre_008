package com.stackoverflow.team08.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackoverflow.team08.auth.jwt.service.JwtCreateService;
import com.stackoverflow.team08.member.dto.MemberDto;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.mapper.MemberMapper;
import com.stackoverflow.team08.member.service.MemberService;
import com.stackoverflow.team08.utils.UriCreator;
import com.stackoverflow.team08.validation.PatchDtoValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper memberMapper;

    private final String MEMBER_DEFAULT_URL = "/members";

    private final PatchDtoValidation patchDtoValidation;

    private final JwtCreateService jwtCreateService;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post){

        Member postMember = memberMapper.memberPostDtoToMember(post);

        Member createdMember = memberService.createMember(postMember);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Valid @Positive @PathVariable("member-id") long memberId){

        Member memberToId = memberService.findMemberToId(memberId);

        MemberDto.Response response = memberMapper.memberToMemberResponse(memberToId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/OAuth2/{member-email}")
    public ResponseEntity getMemberEmail(@Valid @Email @PathVariable("member-email") String memberEmail){

        Member memberToId = memberService.findMemberToEmail(memberEmail);

        MemberDto.Response response = memberMapper.memberToMemberResponse(memberToId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@Valid @Positive @PathVariable("member-id") long memberId,
                                     @Valid @RequestBody MemberDto.Patch patch){

        Member patchMember = memberMapper.memberPatchDtoToMember(patch);

        // DTO를 통한 검증 다른 클래스에 위임
        patchDtoValidation.checkPatchMember(patchMember);

        patchMember.setMemberId(memberId);

        Member updateMember = memberService.updateMember(patchMember);

        MemberDto.Response response = memberMapper.memberToMemberResponse(updateMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(@Valid @Positive @PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);
    }

    @GetMapping("/test/response")
    public void testResponse(HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        ObjectMapper objectMapper = new ObjectMapper();
        String email = objectMapper.writeValueAsString("emailemail");
        response.getWriter().write(email);
    }

    @GetMapping("/test/jwt")
    public String testJwt(){
        return "jwt 로그인 성공";
    }

    @PatchMapping("/OAuth-info")
    public ResponseEntity postOAuth2Info(@Valid @RequestBody MemberDto.OAuthInfo info, HttpServletResponse response){
        Member member = memberMapper.memberOAuthInfoToMember(info);

        // 토큰 생성
        String accessToken = jwtCreateService.delegateAccessToken(member);
        String refreshToken = jwtCreateService.delegateRefreshToken(member);

        member.setRefreshToken(refreshToken);
        // 서비스로 보내서 해당 정보를 업데이트 해주기
        Member updateMember = memberService.oAuth2Update(member);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, updateMember.getMemberId());

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        return ResponseEntity.created(location).build();
    }
}
