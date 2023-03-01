package com.stackoverflow.team08.question.mapper;

import com.stackoverflow.team08.answers.mapper.AnswerMapper;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.mapper.MemberMapper;
import com.stackoverflow.team08.question.dto.QuestionPatchDto;
import com.stackoverflow.team08.question.dto.QuestionPostDto;
import com.stackoverflow.team08.question.dto.QuestionResponseDto;
import com.stackoverflow.team08.question.dto.QuestionVoteResponseDto;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.tag.mapper.TagMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring", uses = {MemberMapper.class, TagMapper.class, AnswerMapper.class})
public interface QuestionMapper {
//    @Mapping(target = "writerId", source = "member.memberId")
//    @Mapping(target = "writerName", source = "member.name")
//    @Mapping(target = "voteCount", expression = "java(question.getVoteCount())")
//    @Mapping(target = "answerCount", expression = "java(question.getAnswers().size())")
//    QuestionResponseDto questionToSimpleResponse(Question question);

//    @Mapping(target = "tags", source = "tags")
    Question questionPostToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchToQuestion(QuestionPatchDto questionPatchDto);
    QuestionResponseDto questionToQuestionResponse(Question question);


//    List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions);
//36번째 줄 부터  43번째 줄추가
//    default List<QuestionResponseDto> questionsToQuestionResponses(Page<Question> questions, Member member) {
//        return questions.map(question -> {
//            QuestionResponseDto response = (QuestionResponseDto) questionsToQuestionResponses(question);
//            return response;
//        }).toList();
//    }
//
//    Object questionsToQuestionResponses(Question question);
//    @Mapping(target = "memberId", source = "member.memberId")
//    @Mapping(target = "userName", source = "member.name")
//    @Mapping(target = "voteCount", expression = "java(question.getVoteCount())")
//    @Mapping(target = "answerCount", expression = "java(question.getAnswers().size())")
    QuestionResponseDto questionToSimpleResponse(Question question);
    default List<QuestionResponseDto> questionsToResponses(Page<Question> questions, Member member) {
        return questions.map(question -> {
            QuestionResponseDto response = questionToSimpleResponse(question);
            return response;
        }).toList();
    }

    default QuestionVoteResponseDto questionToQuestionVoteResponse(Question question) {

        return QuestionVoteResponseDto.builder()
                .questionId(question.getQuestionId())
                .questionVoteCount(question.getQuestionVoteCount())
                .build();
    }

//    List<QuestionResponseDto> questionsToQuestionResponses(Page<Question> page, Member build);
}
