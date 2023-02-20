package com.stackoverflow.team08.server.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class QuestionPostDto {
    @NotBlank(message = "제목을 입력해주세요.")
    private String Title;

    @NotBlank(message = "본문을 입력해주세요.")
    private String Content;

    @NotBlank(message = "내용을 입력해주세요.")
    private String TryAndExpecting;

    private String Tag;
}
