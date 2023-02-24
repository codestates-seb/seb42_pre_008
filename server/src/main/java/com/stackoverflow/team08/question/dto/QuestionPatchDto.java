package com.stackoverflow.team08.question.dto;


import lombok.Getter;

import javax.validation.constraints.Pattern;

@Getter
public class QuestionPatchDto {
    private long questionId;

    private String title;

    private String content;

    private String tryAndExpecting;

    @Pattern(regexp = "^[a-zA-Z]*$", message = "태그는 영문으로 입력해주세요.")
    private String tags;

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

}
