package com.stackoverflow.team08.member.mapper;

import com.stackoverflow.team08.member.dto.MemberDto.Patch;
import com.stackoverflow.team08.member.dto.MemberDto.Post;
import com.stackoverflow.team08.member.dto.MemberDto.Response;
import com.stackoverflow.team08.member.dto.MemberDto.Response.ResponseBuilder;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.entity.Member.MemberBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2023-02-28T03:48:40+0900",
=======
    date = "2023-02-25T00:39:02+0900",
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(Post postDto) {
        if ( postDto == null ) {
            return null;
        }

        MemberBuilder member = Member.builder();

        member.displayName( postDto.getDisplayName() );
        member.email( postDto.getEmail() );
        member.password( postDto.getPassword() );

        return member.build();
    }

    @Override
    public Member memberPatchDtoToMember(Patch patch) {
        if ( patch == null ) {
            return null;
        }

        MemberBuilder member = Member.builder();

        member.displayName( patch.getDisplayName() );
        member.memberImage( patch.getMemberImage() );
        member.location( patch.getLocation() );
        member.aboutMe( patch.getAboutMe() );

        return member.build();
    }

    @Override
    public Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        ResponseBuilder response = Response.builder();

        response.memberId( member.getMemberId() );
        response.displayName( member.getDisplayName() );
        response.email( member.getEmail() );
        response.memberImage( member.getMemberImage() );
        response.location( member.getLocation() );
        response.aboutMe( member.getAboutMe() );

        return response.build();
    }
}
