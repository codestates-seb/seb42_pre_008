package com.stackoverflow.team08.member.mapper;

import com.stackoverflow.team08.member.dto.MemberDto;
import com.stackoverflow.team08.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post postDto);

    Member memberPatchDtoToMember(MemberDto.Patch patch);

    MemberDto.Response memberToMemberResponse(Member member);
}
