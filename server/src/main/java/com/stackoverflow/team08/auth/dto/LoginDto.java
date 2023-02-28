package com.stackoverflow.team08.auth.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginDto {
    @NotBlank
    @Email
    private String username;

    @NotBlank
    @Pattern(regexp = "[~!@#$%^&*a-z1-9]{6,}"
            , message = "특수문자와 영어 숫자를 포함한 6글자 이상 으로 설정해주세요")
    private String password;
}
