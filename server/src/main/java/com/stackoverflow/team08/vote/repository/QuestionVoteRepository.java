package com.stackoverflow.team08.vote.repository;

import com.stackoverflow.team08.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
//    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
}
