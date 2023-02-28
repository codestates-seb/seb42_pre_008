package com.stackoverflow.team08.vote.repository;

<<<<<<< HEAD
import com.stackoverflow.team08.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
//    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
=======
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
}
