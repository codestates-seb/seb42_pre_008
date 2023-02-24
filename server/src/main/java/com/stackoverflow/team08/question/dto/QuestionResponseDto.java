package com.stackoverflow.team08.question.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class QuestionResponseDto {
    private long questionId;
    private long memberId;
    private String userName;
    private long viewCount;
    private long answerCount;
    private long voteCount;
    private LocalDateTime CreatedAt;
    private String title;
    private String content;
    private String tryAndExpecting;
    private String tag;
}
