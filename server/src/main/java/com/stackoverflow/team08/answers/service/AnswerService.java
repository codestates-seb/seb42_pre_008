package com.stackoverflow.team08.answers.service;

import com.stackoverflow.team08.answers.entity.Answer;
<<<<<<< HEAD
import com.stackoverflow.team08.answers.repository.AnswerRepository;
import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
=======
import com.stackoverflow.team08.answers.exception.BusinessLogicException;
import com.stackoverflow.team08.answers.exception.ExceptionCode;
import com.stackoverflow.team08.answers.repository.AnswerRepository;
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
<<<<<<< HEAD
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
=======

import java.time.LocalDateTime;
import java.util.Optional;

@Service
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

<<<<<<< HEAD
    // Answer 생성 및 저장
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

<<<<<<< HEAD
    // Answer 수정 및 저장
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    public Answer updateAnswer(Answer answer) {
        // 해당 답변이 존재하는지 확인
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getContent())
<<<<<<< HEAD
                .ifPresent(content -> findAnswer.setContent(content));
=======
                .ifPresent(comment -> findAnswer.setContent(comment));
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d

        return answerRepository.save(findAnswer);
    }

<<<<<<< HEAD
    // 특정 Answer 조회
    @Transactional(readOnly = true)
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    public Answer findAnswer(long answerId) {
        return findVerifiedAnswer(answerId);
    }

<<<<<<< HEAD
    // 해당 Question에 일치하는 모든 Answer 조회
    @Transactional(readOnly = true)
    public Page<Answer> findAnswers(int page, int size) {
//        return answerRepository.findAllAnswer(PageRequest.of(page, size, Sort.by("answerId").descending()));
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("answerId").descending()));
    }

    // Answer 삭제
=======
    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("answerId").descending()));
    }

>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        answerRepository.delete(findAnswer);
    }

<<<<<<< HEAD
    // 추천 투표
    public void voteUpAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        findAnswer.getAnswerVote().voteUP();

        answerRepository.save(findAnswer);
    }

    // 비추천 투표
    public void voteDownAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        findAnswer.getAnswerVote().voteDown();

        answerRepository.save(findAnswer);
    }

    // 채택 기능
    public void adoptAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        // 동일 questionId를 가지는 답변 중 이미 채택된 답변이 있는지 체크
        findVerifiedAnswerAdopt(findAnswer.getQuestion().getQuestionId());

        findAnswer.setAdopt(true);
    }

    // 채택 취소 기능
    public void adoptCancel(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        findAnswer.setAdopt(false);
    }

    // Answer 존재여부 체크
    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);

        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    // Answer 채택여부 체크
    public void findVerifiedAnswerAdopt(long questionId) {
        List<Answer> answers = answerRepository.adoptedAnswerCheck(questionId);

        answers.stream()
                .forEach(a -> {
                    if(a.isAdopt()) {
                        throw new BusinessLogicException(ExceptionCode.ADOPT_ANSWER_EXIST);
                    }
                });
    }
=======
    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);

        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUNT));

        return findAnswer;
    }
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
}
