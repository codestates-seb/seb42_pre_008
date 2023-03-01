package com.stackoverflow.team08.answers.mapper;

import com.stackoverflow.team08.answers.dto.AnswerPatchDto;
import com.stackoverflow.team08.answers.dto.AnswerPostDto;
import com.stackoverflow.team08.answers.dto.AnswerResponseDto;
import com.stackoverflow.team08.answers.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    @Mapping(source = "answerVote.voteCount", target = "voteCount")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "question.questionId", target = "questionId")
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
    List<AnswerResponseDto> answerToAnswerResponseDtos(List<Answer> answers);
}
