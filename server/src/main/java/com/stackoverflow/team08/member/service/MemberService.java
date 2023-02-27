package com.stackoverflow.team08.member.service;

import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.repository.MemberRepository;
import com.stackoverflow.team08.member.status.MemberStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member createMember(Member member){
        
        // 해당 이메일을 가진 유저가 있는지 검증하기
        verifiedExistsUser(member.getEmail());

        // 기본이미지 설정
        member.setMemberImage("기본이미지");

        // password encoding 하기
        String encodedPw = passwordEncoder.encode(member.getPassword());

        member.setPassword(encodedPw);

        return memberRepository.save(member);
    }

    public Member findMemberToEmail(String email){

        return existsMemberToFindByEmail(email);
    }

    public Member findMemberToId(long id){
        return existsMemberToFindById(id);
    }

    public Member updateMember(Member member){

        Member findMember = existsMemberToFindById(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(findMember::setDisplayName);
        Optional.ofNullable(member.getLocation())
                .ifPresent(findMember::setLocation);
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(findMember::setAboutMe);
        Optional.ofNullable(member.getMemberImage())
                .ifPresent(findMember::setMemberImage);

        return memberRepository.save(findMember);

    }



    public void deleteMember(long id){

        Member findMember = existsMemberToFindById(id);

        findMember.setMemberStatus(MemberStatus.MEMBER_SECESSION);

        memberRepository.save(findMember);
    }

    public Member existsMemberToFindById(long id){

        Optional<Member> optionalMember = memberRepository.findById(id);

        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        verifiedMemberStatus(findMember);

        return findMember;
    }

    // 이메일을 가지고 해당 유저가 있는지 검증하는 메서드
    public Member existsMemberToFindByEmail(String email){

        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        verifiedMemberStatus(findMember);

        return findMember;
    }

    public void verifiedExistsUser(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    // 탈퇴 회원인지 검증
    public void verifiedMemberStatus(Member member){
        if(member.getMemberStatus().equals(MemberStatus.MEMBER_SECESSION)){
            throw new BusinessLogicException(ExceptionCode.MEMBER_SECESSION);
        }
    }

    // 단순히 저장
    public void saveMember(Member member){

        memberRepository.save(member);
    }

}
