package com.stackoverflow.team08.answers.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AnswerPatchDto {
    private long answerId;
    private String content;

    private int voteCount;

    private boolean adopt;

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }
}
