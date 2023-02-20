package com.stackoverflow.team08.answers.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPostDto {
    @NotBlank
    private String content;
    private boolean adopt = false;
}
