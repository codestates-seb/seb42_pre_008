package com.stackoverflow.team08.server.question.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class QuestionResponseDto {
    private long questionId;
    private String title;
    private String content;
    private String tryAndExpecting;
    private String tag;
}
