package com.stackoverflow.team08.question.controller;


import com.stackoverflow.team08.config.pageable.CustomPageRequest;
import com.stackoverflow.team08.dto.MultiResponseDto;
import com.stackoverflow.team08.dto.SingleResponseDto;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.member.service.MemberService;
import com.stackoverflow.team08.question.dto.QuestionPatchDto;
import com.stackoverflow.team08.question.dto.QuestionPostDto;
import com.stackoverflow.team08.question.dto.QuestionResponseDto;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.question.mapper.QuestionMapper;
import com.stackoverflow.team08.question.page.QuestionPageRequest;
import com.stackoverflow.team08.question.page.QuestionSortingType;
import com.stackoverflow.team08.question.service.QuestionService;
import com.stackoverflow.team08.utils.UriCreator;
import com.stackoverflow.team08.vote.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.security.Principal;
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
    private final MemberService memberService;
    private final QuestionMapper mapper;

//    public QuestionController(QuestionService questionService, QuestionMapper mapper, QuestionVoteService questionVoteService) {
//        this.questionService = questionService;
//        this.mapper = mapper;
//        this.questionVoteService = questionVoteService;
//    }


    @PostMapping
    public ResponseEntity postQuestion(Principal principal,
            @Valid @RequestBody QuestionPostDto questionPostDto
    ) {

        Question question = questionService.createQuestion(mapper.questionPostToQuestion(questionPostDto));
        question.setMember(memberService.findMemberToEmail(principal.getName()));
//        //64,65 추가 3.1 memberId 관련 추가

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());

        return ResponseEntity.created(location).build();
    }

//    @PostMapping
//    public ResponseEntity<SingleResponseDto<QuestionResponseDto>> post(
//            @AuthenticationPrincipal Member member,
//            @Valid @RequestBody QuestionPostDto post
//    ) {
//        Question question = questionService.write(mapper.questionPostToQuestion(post), member);
//        QuestionResponseDto response = mapper.questionToQuestionResponse(question);
//        mapper.setPropertiesToResponse(member, question, response);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(new SingleResponseDto<>(response));
//    }



    @PostMapping("/{question-id}/{member-id}/vote/up")
    public ResponseEntity<SingleResponseDto> questionVoteUp(@PathVariable("question-id") @Positive long questionId,
                                                            @PathVariable("member-id") @Positive long id) {
        Member member = memberService.findMemberToId(id); //관우님이 설계 하신 거에 따라 변경 가능
        Question question = questionService.findQuestion(questionId);
        questionVoteService.increaseVote(member, question);

        return new ResponseEntity<>(new SingleResponseDto(mapper.questionToQuestionVoteResponse(question)), HttpStatus.OK);
    }
//
    @PostMapping("/{question-id}/{member-id}/vote/down")
    public ResponseEntity<SingleResponseDto> questionVoteDown(@PathVariable("question-id") @Positive long questionId,
                                                              @PathVariable("member-id") @Positive long id) {
        Member member = memberService.findMemberToId(id);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.decreaseVote(member, question);

        return new ResponseEntity<>(new SingleResponseDto(mapper.questionToQuestionVoteResponse(question)), HttpStatus.OK);
    }

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
//테스트중 27일 전체목록 불러오기 포스트맨으로
//    @GetMapping
//    public ResponseEntity getQuestions(QuestionPageRequest pageRequest) {
//        Page<Question> pageQuestions = questionService.findAll(pageRequest);
//        List<Question> questions = pageQuestions.getContent();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions
//                     ),
//                HttpStatus.OK);
//    }
    @GetMapping
        public ResponseEntity<?> getAll(
        QuestionPageRequest pageRequest
    ) {
        return getMultiResponseEntity(questionService.findAll(pageRequest));
    }


//    @GetMapping
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
//        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
//        List<Question> questions = pageQuestions.getContent();
//
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//
//    }
//밑으로 잠시 주석처리 27일
//    @GetMapping("/search")
//    public ResponseEntity<?> searchQuestions(@RequestParam(name = "query") String query,
//                                             QuestionPageRequest pageRequest) {
//        Page<Question> pageQuestions = questionService.search(query, pageRequest);
//        List<Question> questions = pageQuestions.getContent();
//        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponses(questions), pageQuestions), HttpStatus.OK);
//    }
// 페이지 네이션 까지 출력 되게
//    @GetMapping
//    public ResponseEntity getQuestions(
//            @PageableDefault(size = 15, sort = "questionId", direction = Sort.Direction.DESC) Pageable pageable) {
//
//        Page<Question> questionPage = questionService.findAll(0);
//        List<Question> questions = questionPage.getContent();
//
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(
//                        mapper.questionsToQuestionResponses(questions), questionPage),
//                HttpStatus.OK);
//    }
    @GetMapping("/search")
    public ResponseEntity<?> searchQuestions(
            @RequestParam(name = "q") String query,
            QuestionPageRequest pageRequest
    ) {
        return getMultiResponseEntity(questionService.search(query, pageRequest));
    }

    @GetMapping("/tagged/{tag-name}")
    public ResponseEntity<?> searchQuestionsByTag(
            @PathVariable("tag-name") String tagName, QuestionPageRequest pageRequest) {
        return getMultiResponseEntity(questionService.findAllByTag(tagName, pageRequest));
    }



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

    private ResponseEntity<?> getMultiResponseEntity(Page<Question> page) {
        if (page.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            List<QuestionResponseDto> responses = mapper.questionsToResponses(page, Member.builder().build());
            return new ResponseEntity<>(new MultiResponseDto<>(responses, page), HttpStatus.OK);
        }
    }
}
