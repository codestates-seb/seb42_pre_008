package com.stackoverflow.team08.answers.controller;

import com.stackoverflow.team08.answers.dto.AnswerPatchDto;
import com.stackoverflow.team08.answers.dto.AnswerPostDto;
import com.stackoverflow.team08.answers.dto.AnswerResponseDto;
import com.stackoverflow.team08.answers.entity.Answer;
import com.stackoverflow.team08.answers.mapper.AnswerMapper;
import com.stackoverflow.team08.answers.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {
        System.out.println("# POST Answer!");
        Answer response = mapper.answerPostDtoToAnswer(answerPostDto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {
        System.out.println("# PATCH Answer!");
        answerPatchDto.setAnswerId(answerId);

        Answer response = answerService.updateAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        System.out.println("# GET Answer!");
        Answer response = answerService.findAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(response), HttpStatus.OK);
    }

    @GetMapping
    public RequestBody getAnswers() {
        System.out.println("# GET Answers!");

        List<Answer> answers = answerService.findAnswers();
        List<AnswerResponseDto> response = mapper.answerToAnswerResponseDto(answers);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public RequestBody deleteAnswer(@PathVariable("answer-id") @Positive long answerId) {
        System.out.println("# DELETE Answer!");
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
