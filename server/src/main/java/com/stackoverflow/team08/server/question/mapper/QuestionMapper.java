package com.stackoverflow.team08.server.question.mapper;

import com.stackoverflow.team08.server.question.dto.QuestionPatchDto;
import com.stackoverflow.team08.server.question.dto.QuestionPostDto;
import com.stackoverflow.team08.server.question.dto.QuestionResponseDto;
import com.stackoverflow.team08.server.question.dto.QuestionVoteResponseDto;
import com.stackoverflow.team08.server.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostToQuestion(QuestionPostDto requestBody);
    Question questionPatchToQuestion(QuestionPatchDto requestBody);
    QuestionResponseDto questionToQuestionResponse(Question question);
    List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions);

    default QuestionVoteResponseDto questionToQuestionVoteResponse(Question question) {

        return QuestionVoteResponseDto.builder()
                .questionId(question.getQuestionId())
                .questionVoteCount(question.getQuestionVoteCount())
                .build();
    }
}
