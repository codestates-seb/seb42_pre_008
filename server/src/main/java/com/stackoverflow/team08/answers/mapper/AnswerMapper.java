package com.stackoverflow.team08.answers.mapper;

import com.stackoverflow.team08.answers.dto.AnswerPatchDto;
import com.stackoverflow.team08.answers.dto.AnswerPostDto;
import com.stackoverflow.team08.answers.dto.AnswerResponseDto;
import com.stackoverflow.team08.answers.entity.Answer;
import org.mapstruct.Mapper;
<<<<<<< HEAD
import org.mapstruct.Mapping;
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
<<<<<<< HEAD
    @Mapping(source = "answerVote.voteCount", target = "voteCount")
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
    List<AnswerResponseDto> answerToAnswerResponseDtos(List<Answer> answers);
}
