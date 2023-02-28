package com.stackoverflow.team08.question.mapper;

import com.stackoverflow.team08.question.dto.QuestionPatchDto;
import com.stackoverflow.team08.question.dto.QuestionPostDto;
import com.stackoverflow.team08.question.dto.QuestionResponseDto;
import com.stackoverflow.team08.question.dto.QuestionResponseDto.QuestionResponseDtoBuilder;
import com.stackoverflow.team08.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2023-02-28T11:38:45+0900",
=======
    date = "2023-02-26T07:11:06+0900",
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
<<<<<<< HEAD
    public Question questionPostToQuestion(QuestionPostDto requestBody) {
        if ( requestBody == null ) {
=======
    public Question questionPostToQuestion(QuestionPostDto questionPostDto) {
        if ( questionPostDto == null ) {
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
            return null;
        }

        Question question = new Question();

<<<<<<< HEAD
        question.setTitle( requestBody.getTitle() );
        question.setContent( requestBody.getContent() );
        question.setTryAndExpecting( requestBody.getTryAndExpecting() );
=======
        question.setTitle( questionPostDto.getTitle() );
        question.setContent( questionPostDto.getContent() );
        question.setTryAndExpecting( questionPostDto.getTryAndExpecting() );
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d

        return question;
    }

    @Override
<<<<<<< HEAD
    public Question questionPatchToQuestion(QuestionPatchDto requestBody) {
        if ( requestBody == null ) {
=======
    public Question questionPatchToQuestion(QuestionPatchDto questionPatchDto) {
        if ( questionPatchDto == null ) {
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
            return null;
        }

        Question question = new Question();

<<<<<<< HEAD
        question.setQuestionId( requestBody.getQuestionId() );
        question.setTitle( requestBody.getTitle() );
        question.setContent( requestBody.getContent() );
        question.setTryAndExpecting( requestBody.getTryAndExpecting() );
=======
        question.setQuestionId( questionPatchDto.getQuestionId() );
        question.setTitle( questionPatchDto.getTitle() );
        question.setContent( questionPatchDto.getContent() );
        question.setTryAndExpecting( questionPatchDto.getTryAndExpecting() );
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d

        return question;
    }

    @Override
    public QuestionResponseDto questionToQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDtoBuilder questionResponseDto = QuestionResponseDto.builder();

        if ( question.getQuestionId() != null ) {
            questionResponseDto.questionId( question.getQuestionId() );
        }
        questionResponseDto.viewCount( question.getViewCount() );
        questionResponseDto.title( question.getTitle() );
        questionResponseDto.content( question.getContent() );
        questionResponseDto.tryAndExpecting( question.getTryAndExpecting() );

        return questionResponseDto.build();
    }

    @Override
    public List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponse( question ) );
        }

        return list;
    }
}
