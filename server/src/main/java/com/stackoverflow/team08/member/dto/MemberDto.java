package com.stackoverflow.team08.member.dto;

import lombok.*;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.*;
import java.util.Optional;

public class MemberDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post{

        @NotBlank
        @Pattern(regexp = "[a-zA-Z1-9가-힣]{2,}"
                , message = "닉네임은 특수문자를 포함하지 않은 영어(대, 소문자), 한글, 숫자로 이루어져야 합니다.")
        private  String displayName;

        @NotBlank
        @Pattern(regexp = "[~!@#$%^&*a-z1-9]{6,}"
                , message = "특수문자와 영어 숫자를 포함한 6글자 이상 으로 설정해주세요")
        private  String password;

        @Email
        @NotBlank
        private  String email;

        @Builder
        public Post(String displayName, String password, String email) {
            this.displayName = displayName;
            this.password = password;
            this.email = email;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch{
        private  String displayName;
        private  String location;
        private  String aboutMe;
        private  String memberImage;
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
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response{
        private  long memberId;

        private  String displayName;

        private  String email;

        private  String memberImage;

        private  String location;

        private  String aboutMe;

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

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class OAuthInfo{
        @Positive
        private  long memberId;
        @NotBlank
        @Pattern(regexp = "[a-zA-Z1-9가-힣]{2,}"
                , message = "닉네임은 특수문자를 포함하지 않은 영어(대, 소문자), 한글, 숫자로 이루어져야 합니다.")
        private  String displayName;
        private  String memberImage;
        @Builder
        public OAuthInfo(long memberId, String displayName, String memberImage) {
            this.memberId = memberId;
            this.displayName = displayName;
            this.memberImage = memberImage;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ResponseLogin{
        // response displayName, id, email
        private  long memberId;
        private  String displayName;
        private  String email;
        @Builder
        public ResponseLogin(long memberId, String displayName, String email) {
            this.memberId = memberId;
            this.displayName = displayName;
            this.email = email;
        }
    }
}
