package com.stackoverflow.team08.answers.controller;

import com.stackoverflow.team08.answers.dto.AnswerPatchDto;
import com.stackoverflow.team08.answers.dto.AnswerPostDto;
import com.stackoverflow.team08.answers.entity.Answer;
import com.stackoverflow.team08.answers.entity.AnswerVote;
import com.stackoverflow.team08.answers.mapper.AnswerMapper;
import com.stackoverflow.team08.answers.response.MultiResponseDto;
import com.stackoverflow.team08.answers.service.AnswerService;
import com.stackoverflow.team08.member.service.MemberService;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.question.service.QuestionService;
import com.stackoverflow.team08.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/answers";

    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(MemberService memberService, QuestionService questionService, AnswerService answerService, AnswerMapper mapper) {
        this.memberService = memberService;
        this.questionService = questionService;
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@RequestBody AnswerPostDto answerPostDto) {
        System.out.println("# POST Answer!");
        Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);

        // memberId
        long memberId = answerPostDto.getMemberId();
        long questionId = answerPostDto.getQuestionId();

        answer.setMember(memberService.findMemberToId(memberId));
        answer.setQuestion(questionService.findVerifiedQuestion(questionId));

        // Vote 객체 추가
        answer.setAnswerVote(new AnswerVote());

        Answer createdAnswer = answerService.createAnswer(answer);
        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, createdAnswer.getAnswerId());


        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") long answerId,
                                      @RequestBody AnswerPatchDto answerPatchDto) {
        System.out.println("# PATCH Answer!");
        answerPatchDto.setAnswerId(answerId);

        Answer answer = mapper.answerPatchDtoToAnswer(answerPatchDto);

        Answer updatedAnswer = answerService.updateAnswer(answer);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(updatedAnswer), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        System.out.println("# GET Answer!");
        Answer response = answerService.findAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        System.out.println("# GET Answers!");

        Page<Answer> pageAnswers = answerService.findAnswers(page - 1, size);
        List<Answer> answers = pageAnswers.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.answerToAnswerResponseDtos(answers), pageAnswers), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId) {
        System.out.println("# DELETE Answer!");
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 추천 투표
    @PatchMapping("/{answer-id}/vote-up")
    public ResponseEntity voteUpAnswer(@PathVariable("answer-id") long answerId) {
        System.out.println("# THIS ANSWER VOTE UP!");
        answerService.voteUpAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 비추천 투표
    @PatchMapping("/{answer-id}/vote-down")
    public ResponseEntity voteDownAnswer(@PathVariable("answer-id") long answerId) {
        System.out.println("# THIS ANSWER VOTE UP!");
        answerService.voteDownAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 답변 채택
    @PatchMapping("/{answer-id}/adopt")
    public ResponseEntity adoptAnswer(@PathVariable("answer-id") long answerId) {
        System.out.println("# THIS ANSWER ADOPTED");
        answerService.adoptAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 답변 채택 취소
    @PatchMapping("/{answer-id}/adopt-cancel")
    public ResponseEntity adoptCancel(@PathVariable("answer-id") long answerId) {
        System.out.println("# THIS ANSWER ADOPTED");
        answerService.adoptCancel(answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
