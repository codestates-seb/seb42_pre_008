package com.stackoverflow.team08.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {

    @Getter
    public static class Post{

        @NotBlank

        private final String displayName;

        @NotBlank
        private final String password;

        @Email
        @NotBlank
        private final String email;

        @Builder
        public Post(String displayName, String password, String email) {
            this.displayName = displayName;
            this.password = password;
            this.email = email;
        }
    }

    @Getter
    public static class Patch{

        private final String displayName;

        private final String location;

        private final String aboutMe;

        private final String memberImage;
        @Builder
        public Patch(String displayName, String location, String aboutMe, String memberImage) {
            this.displayName = displayName;
            this.location = location;
            this.aboutMe = aboutMe;
            this.memberImage = memberImage;
        }
    }

    @Getter
    @Setter
    public static class Response{
        private final long memberId;

        private final String displayName;

        private final String email;

        private final String memberImage;

        private final String location;

        private final String aboutMe;

        @Builder
        public Response(long memberId, String displayName, String email, String memberImage, String location, String aboutMe) {
            this.memberId = memberId;
            this.displayName = displayName;
            this.email = email;
            this.memberImage = memberImage;
            this.location = location;
            this.aboutMe = aboutMe;
        }
    }
}
