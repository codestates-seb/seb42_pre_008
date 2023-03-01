package com.stackoverflow.team08.answers.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponseDto {
    private long memberId;
    private long questionId;
    private long answerId;
    private String content;
    private int voteCount;
    private boolean adopt;
}
