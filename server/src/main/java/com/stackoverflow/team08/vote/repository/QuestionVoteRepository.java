package com.stackoverflow.team08.vote.repository;

import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
}
