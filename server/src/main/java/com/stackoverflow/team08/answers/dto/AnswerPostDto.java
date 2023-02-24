package com.stackoverflow.team08.answers.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPostDto {
    @NotBlank(message = "내용을 입력하세요")
    private String content;
}
