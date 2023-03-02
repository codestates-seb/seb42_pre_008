package com.stackoverflow.team08.answers.mapper;

import com.stackoverflow.team08.answers.dto.AnswerPatchDto;
import com.stackoverflow.team08.answers.dto.AnswerPostDto;
import com.stackoverflow.team08.answers.dto.AnswerResponseDto;
import com.stackoverflow.team08.answers.entity.Answer;
import com.stackoverflow.team08.answers.entity.AnswerVote;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-02T10:00:54+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setContent( answerPostDto.getContent() );
        answer.setAdopt( answerPostDto.isAdopt() );

        return answer;
    }

    @Override
    public Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto) {
        if ( answerPatchDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( answerPatchDto.getAnswerId() );
        answer.setContent( answerPatchDto.getContent() );
        answer.setAdopt( answerPatchDto.isAdopt() );

        return answer;
    }

    @Override
    public AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerResponseDto answerResponseDto = new AnswerResponseDto();

        answerResponseDto.setVoteCount( answerAnswerVoteVoteCount( answer ) );
        answerResponseDto.setMemberId( answerMemberMemberId( answer ) );
        Long questionId = answerQuestionQuestionId( answer );
        if ( questionId != null ) {
            answerResponseDto.setQuestionId( questionId );
        }
        answerResponseDto.setAnswerId( answer.getAnswerId() );
        answerResponseDto.setContent( answer.getContent() );
        answerResponseDto.setAdopt( answer.isAdopt() );

        return answerResponseDto;
    }

    @Override
    public List<AnswerResponseDto> answerToAnswerResponseDtos(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<AnswerResponseDto> list = new ArrayList<AnswerResponseDto>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponseDto( answer ) );
        }

        return list;
    }

    private int answerAnswerVoteVoteCount(Answer answer) {
        if ( answer == null ) {
            return 0;
        }
        AnswerVote answerVote = answer.getAnswerVote();
        if ( answerVote == null ) {
            return 0;
        }
        int voteCount = answerVote.getVoteCount();
        return voteCount;
    }

    private long answerMemberMemberId(Answer answer) {
        if ( answer == null ) {
            return 0L;
        }
        Member member = answer.getMember();
        if ( member == null ) {
            return 0L;
        }
        long memberId = member.getMemberId();
        return memberId;
    }

    private Long answerQuestionQuestionId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Question question = answer.getQuestion();
        if ( question == null ) {
            return null;
        }
        Long questionId = question.getQuestionId();
        if ( questionId == null ) {
            return null;
        }
        return questionId;
    }
}
