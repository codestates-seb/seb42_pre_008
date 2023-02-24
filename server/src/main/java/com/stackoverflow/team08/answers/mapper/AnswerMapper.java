package com.stackoverflow.team08.answers.mapper;

import com.stackoverflow.team08.answers.dto.AnswerPatchDto;
import com.stackoverflow.team08.answers.dto.AnswerPostDto;
import com.stackoverflow.team08.answers.dto.AnswerResponseDto;
import com.stackoverflow.team08.answers.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
    List<AnswerResponseDto> answerToAnswerResponseDtos(List<Answer> answers);
}
