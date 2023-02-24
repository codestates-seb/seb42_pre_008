package com.stackoverflow.team08.server.question.repository;

import com.stackoverflow.team08.server.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
