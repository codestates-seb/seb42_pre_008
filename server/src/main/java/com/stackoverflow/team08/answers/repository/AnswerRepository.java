package com.stackoverflow.team08.answers.repository;

import com.stackoverflow.team08.answers.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
//    Page<Answer> findAllByQuestionId(Pageable pageable);
}
