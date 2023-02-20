package com.stackoverflow.team08.answers.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AnswerPatchDto {
    private long answerId;

    @NotBlank(message = "공백이 아니어야 합니다.")
    private String content;

    private boolean adopt;
}
