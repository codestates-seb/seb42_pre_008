package com.stackoverflow.team08.server.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

@Getter
public class QuestionPostDto {
    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "본문을 입력해주세요.")
    private String content;

    @NotBlank(message = "내용을 입력해주세요.")
    private String tryAndExpecting;

    @Pattern(regexp = "^[a-zA-Z]*$", message = "태그는 영문으로 입력해주세요.")
    private String tags;
}
