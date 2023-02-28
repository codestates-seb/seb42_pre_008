package com.stackoverflow.team08.question.dto;

import com.stackoverflow.team08.tag.dto.TagResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
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

    private List<TagResponseDto.Response> tags;
}
