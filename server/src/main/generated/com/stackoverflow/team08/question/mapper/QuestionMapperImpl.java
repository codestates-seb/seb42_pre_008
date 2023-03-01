package com.stackoverflow.team08.question.mapper;

import com.stackoverflow.team08.question.dto.QuestionPatchDto;
import com.stackoverflow.team08.question.dto.QuestionPostDto;
import com.stackoverflow.team08.question.dto.QuestionResponseDto;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.question.entity.QuestionTag;
import com.stackoverflow.team08.tag.dto.TagResponseDto.Response;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-01T18:13:29+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostToQuestion(QuestionPostDto questionPostDto) {
        if ( questionPostDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setTitle( questionPostDto.getTitle() );
        question.setContent( questionPostDto.getContent() );
        question.setTryAndExpecting( questionPostDto.getTryAndExpecting() );

        return question;
    }

    @Override
    public Question questionPatchToQuestion(QuestionPatchDto questionPatchDto) {
        if ( questionPatchDto == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( questionPatchDto.getQuestionId() );
        question.setTitle( questionPatchDto.getTitle() );
        question.setContent( questionPatchDto.getContent() );
        question.setTryAndExpecting( questionPatchDto.getTryAndExpecting() );

        return question;
    }

    @Override
    public QuestionResponseDto questionToQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();

        if ( question.getQuestionId() != null ) {
            questionResponseDto.setQuestionId( question.getQuestionId() );
        }
        questionResponseDto.setViewCount( question.getViewCount() );
        questionResponseDto.setCreatedAt( question.getCreatedAt() );
        questionResponseDto.setTitle( question.getTitle() );
        questionResponseDto.setContent( question.getContent() );
        questionResponseDto.setTryAndExpecting( question.getTryAndExpecting() );
        questionResponseDto.setQuestionTags( questionTagListToResponseList( question.getQuestionTags() ) );

        return questionResponseDto;
    }

    @Override
    public QuestionResponseDto questionToSimpleResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();

        if ( question.getQuestionId() != null ) {
            questionResponseDto.setQuestionId( question.getQuestionId() );
        }
        questionResponseDto.setViewCount( question.getViewCount() );
        questionResponseDto.setCreatedAt( question.getCreatedAt() );
        questionResponseDto.setTitle( question.getTitle() );
        questionResponseDto.setContent( question.getContent() );
        questionResponseDto.setTryAndExpecting( question.getTryAndExpecting() );
        questionResponseDto.setQuestionTags( questionTagListToResponseList( question.getQuestionTags() ) );

        return questionResponseDto;
    }

    protected Response questionTagToResponse(QuestionTag questionTag) {
        if ( questionTag == null ) {
            return null;
        }

        Response response = new Response();

        return response;
    }

    protected List<Response> questionTagListToResponseList(List<QuestionTag> list) {
        if ( list == null ) {
            return null;
        }

        List<Response> list1 = new ArrayList<Response>( list.size() );
        for ( QuestionTag questionTag : list ) {
            list1.add( questionTagToResponse( questionTag ) );
        }

        return list1;
    }
}
