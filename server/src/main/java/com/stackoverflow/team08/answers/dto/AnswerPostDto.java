package com.stackoverflow.team08.answers.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPostDto {
    private long memberId;
    private long questionId;
    @NotBlank(message = "내용을 입력하세요")
    private String content;
    private boolean adopt;
}
