package com.stackoverflow.team08.member.controller;

import com.stackoverflow.team08.member.dto.MemberDto;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.mapper.MemberMapper;
import com.stackoverflow.team08.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper memberMapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post){

        Member postMember = memberMapper.memberPostDtoToMember(post);

        Member createdMember = memberService.createMember(postMember);
        //URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        //return ResponseEntity.created(location).build();

        return null;
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Valid @Positive @PathVariable("member-id") long memberId){

        Member memberToId = memberService.findMemberToId(memberId);

        MemberDto.Response response = memberMapper.memberToMemberResponse(memberToId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@Valid @Positive @PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.Patch patch){

        Member patchMember = memberMapper.memberPatchDtoToMember(patch);

        Member updateMember = memberService.updateMember(patchMember);

        MemberDto.Response response = memberMapper.memberToMemberResponse(updateMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public void deleteMember(@Valid @Positive @PathVariable("member-id") long memberId){
        memberService.deleteMember(memberId);
    }
}
