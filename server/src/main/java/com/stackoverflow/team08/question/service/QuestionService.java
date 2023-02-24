package com.stackoverflow.team08.server.question.service;

import com.stackoverflow.team08.server.config.pageable.CustomPageRequest;
import com.stackoverflow.team08.server.exception.BusinessLogicException;
import com.stackoverflow.team08.server.exception.ExceptionCode;
import com.stackoverflow.team08.server.question.entity.Question;
import com.stackoverflow.team08.server.question.page.QuestionPageRequest;
import com.stackoverflow.team08.server.question.page.QuestionSortingType;
import com.stackoverflow.team08.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
//        질문을 수정할 때 질문 작성자만 가능해야 함

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getTryAndExpecting())
                .ifPresent(tryAndExpecting -> findQuestion.setTryAndExpecting(tryAndExpecting));


        return questionRepository.save(findQuestion);
    }

    @Transactional(readOnly = true)
    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

//    public Page<Question> findAll(CustomPageRequest<QuestionSortingType> pageRequest) {
//        switch (pageRequest.getSortType()) {
//            case NEWEST:
//                return questionRepository.findAll(pageRequest.of());
//            case ANSWERED:
//                return questionRepository.findAllByAnswersExistQuestion(pageRequest.of());
//            case UNANSWERED:
//                return questionRepository.findAllByAnswersEmpty(pageRequest.of());
//            default:
//                throw new RuntimeException("Unexpected exception occurred.");
//        }
//    }

//    public Page<Question> search(String query, QuestionPageRequest pageRequest) {
//        switch (pageRequest.getSortType()) {
//            case NEWEST:
//                return questionRepository.findAllByTitleOrContentLike(query, pageRequest.of());
//            case ANSWERED:
//                return questionRepository.findAllByAnswersIsExistAndTitleOrContentLike(query, pageRequest.of());
//            case UNANSWERED:
//                return questionRepository.findAllByAnswersIsEmptyAndTitleOrContentLike(query, pageRequest.of());
//            default:
//                throw new RuntimeException("Unexpected exception occurred.");
//        }
//    }

//    public Page<Question> findQuestions(int page, int size) {
//        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
//
//    public Page<Question> findUnansweredQuestions(int page, int size) {
//        return questionRepository.findAllByNoAnswerQuestion(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
//
//    public Page<Question> findAnsweredQuestions(int page, int size) {
//        return questionRepository.findAllByAnswerExistQuestion(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
//
//    @Transactional
//    public int viewCountUp(Long questionId) {
//        return questionRepository.updateView(questionId);
//    }
    //this. 생략

    @Transactional
    public void viewCountUp(Long questionId) {
        Question question = findQuestion(questionId);
        question.viewCount(question);
    }

    public void deleteQuestion(long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);

        questionRepository.delete(findQuestion);
    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;
    }
}
