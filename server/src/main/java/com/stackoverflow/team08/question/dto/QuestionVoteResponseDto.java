package com.stackoverflow.team08.server.question.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionVoteResponseDto {
    private long questionId;
    private long questionVoteCount;
}
