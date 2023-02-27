package com.stackoverflow.team08.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Optional;

public class MemberDto {

    @Getter
    public static class Post{

        @NotBlank
        @Pattern(regexp = "[a-zA-Z1-9가-힣]{2,}"
                , message = "닉네임은 특수문자를 포함하지 않은 영어(대, 소문자), 한글, 숫자로 이루어져야 합니다.")
        private final String displayName;

        @NotBlank
        @Pattern(regexp = "[~!@#$%^&*a-z1-9]{6,}"
                , message = "특수문자와 영어 숫자를 포함한 6글자 이상 으로 설정해주세요")
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
