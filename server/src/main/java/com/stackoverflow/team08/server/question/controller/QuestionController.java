package com.stackoverflow.team08.server.question.controller;

import com.stackoverflow.team08.server.dto.MultiResponseDto;
import com.stackoverflow.team08.server.dto.SingleResponseDto;
//import com.stackoverflow.team08.server.member.entity.Member;
import com.stackoverflow.team08.server.question.dto.QuestionPatchDto;
import com.stackoverflow.team08.server.question.dto.QuestionPostDto;
import com.stackoverflow.team08.server.question.dto.QuestionResponseDto;
import com.stackoverflow.team08.server.question.entity.Question;
import com.stackoverflow.team08.server.question.mapper.QuestionMapper;
import com.stackoverflow.team08.server.question.page.QuestionPageRequest;
import com.stackoverflow.team08.server.question.service.QuestionService;
import com.stackoverflow.team08.server.utils.UriCreator;
import com.stackoverflow.team08.server.vote.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
@RequiredArgsConstructor
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionVoteService questionVoteService;
//    private final MemberService memberService;
    private final QuestionMapper mapper;

//    public QuestionController(QuestionService questionService, QuestionMapper mapper, QuestionVoteService questionVoteService) {
//        this.questionService = questionService;
//        this.mapper = mapper;
//        this.questionVoteService = questionVoteService;
//    }


    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {
        Question question = questionService.createQuestion(mapper.questionPostToQuestion(questionPostDto));

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());

        return ResponseEntity.created(location).build();
    }

//    @PostMapping("/{question-id}/vote/up")
//    public ResponseEntity<SingleResponseDto> questionVoteUp(@PathVariable("question-id") @Positive long questionId) {
////        Member member = memberService.findMember(memberId); //관우님이 설계 하신 거에 따라 변경 가능
//        Question question = questionService.findQuestion(questionId);
//        questionVoteService.increaseVote(member, question);
//
//        return new ResponseEntity<>(new SingleResponseDto(mapper.questionToQuestionVoteResponse(question)), HttpStatus.OK);
//    }
//
//    @PostMapping("/{question-id}/vote/down")
//    public ResponseEntity<SingleResponseDto> questionVoteDown(@PathVariable("question-id") @Positive long questionId) {
//        Member member = memberService.findMember(memberId);
//        Question question = questionService.findQuestion(questionId);
//        questionVoteService.decreaseVote(member, question);
//
//        return new ResponseEntity<>(new SingleResponseDto(mapper.questionToQuestionResponse(question)), HttpStatus.OK);
//    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {
        questionPatchDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchToQuestion(questionPatchDto));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponse(question)), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId,
                                        HttpServletRequest req, HttpServletResponse res) {
        viewCountUp(questionId, req, res);
        Question question = questionService.findQuestion(questionId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponse(question)), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<?> getQuestions(QuestionPageRequest pageRequest) {
//        Page<Question> pageQuestions = questionService.findAll(pageRequest);
//        List<Question> questions = pageQuestions.getContent();
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//    }


//    public ResponseEntity getQuestions(@Positive @RequestParam int page, //pageable
//                                       @Positive @RequestParam int size,
//                                       @RequestParam(defaultValue = "Newest", required = false) String filter) {
//        if (filter.equals("Newest")) {
//            Page<Question> pageQuestions = questionService.findQuestions(page - 1, 15);
//            List<Question> questions = pageQuestions.getContent();
//            return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//        } else if (filter.equals("Unanswered")) {
//            Page<Question> pageQuestions = questionService.findUnansweredQuestions(page - 1, 15);
//            List<Question> questions = pageQuestions.getContent();
//            return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//        } else if (filter.equals("Answered")) {
//            Page<Question> pageQuestions = questionService.findAnsweredQuestions(page - 1, 15);
//            List<Question> questions = pageQuestions.getContent();
//            return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//        }
//        Page<Question> pageQuestions = questionService.findQuestions(page - 1 , size);
//        List<Question> questions = pageQuestions.getContent();

//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//        return null;

//    @GetMapping("/search")
//    public ResponseEntity<?> searchQuestions(@RequestParam(name = "query") String query,
//                                             QuestionPageRequest pageRequest) {
//        Page<Question> pageQuestions = questionService.search(query, pageRequest);
//        List<Question> questions = pageQuestions.getContent();
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//    }




    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId) {
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void viewCountUp(Long questionId, HttpServletRequest req, HttpServletResponse res) {

        Cookie oldCookie = null;

        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("questionView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + questionId.toString() + "]")) {
                questionService.viewCountUp(questionId);
                oldCookie.setValue(oldCookie.getValue() + "_[" + questionId + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                res.addCookie(oldCookie);
            }
        } else {
            questionService.viewCountUp(questionId);
            Cookie newCookie = new Cookie("questionView","[" + questionId + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            res.addCookie(newCookie);
        }
    }

}
