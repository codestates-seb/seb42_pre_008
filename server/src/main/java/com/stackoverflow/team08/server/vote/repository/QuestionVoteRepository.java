package com.stackoverflow.team08.server.vote.repository;

import com.stackoverflow.team08.server.member.entity.Member;
import com.stackoverflow.team08.server.question.entity.Question;
import com.stackoverflow.team08.server.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
//    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
}
