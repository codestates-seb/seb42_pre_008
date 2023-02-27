package com.stackoverflow.team08.answers.service;

import com.stackoverflow.team08.answers.entity.Answer;
import com.stackoverflow.team08.answers.exception.BusinessLogicException;
import com.stackoverflow.team08.answers.exception.ExceptionCode;
import com.stackoverflow.team08.answers.repository.AnswerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    // Answer 생성 및 저장
    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    // Answer 수정 및 저장
    public Answer updateAnswer(Answer answer) {
        // 해당 답변이 존재하는지 확인
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getContent())
                .ifPresent(content -> findAnswer.setContent(content));

        return answerRepository.save(findAnswer);
    }

    // 특정 Answer 조회
    @Transactional(readOnly = true)
    public Answer findAnswer(long answerId) {
        return findVerifiedAnswer(answerId);
    }

    // 해당 Question에 일치하는 모든 Answer 조회
    @Transactional(readOnly = true)
    public Page<Answer> findAnswers(int page, int size) {
//        return answerRepository.findAllByQuestionId(PageRequest.of(page, size, Sort.by("answerId").descending()));
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("answerId").descending()));
    }

    // Answer 삭제
    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        answerRepository.delete(findAnswer);
    }

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

    // Answer 존재여부 체크
    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);

        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUNT));

        return findAnswer;
    }
}
