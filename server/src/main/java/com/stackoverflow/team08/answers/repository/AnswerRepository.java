package com.stackoverflow.team08.answers.repository;

import com.stackoverflow.team08.answers.entity.Answer;
<<<<<<< HEAD
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query(value = "SELECT a FROM ANSWER a JOIN a.question q WHERE q.questionId = :questionId")
    Page<Answer> findAllAnswer(Pageable pageable);

    @Query(value = "SELECT a FROM ANSWER a JOIN a.question q WHERE q.questionId = :questionId")
    List<Answer> adoptedAnswerCheck(@Param("questionId") long questionId);
=======
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
}
