package com.stackoverflow.team08.vote.service;

<<<<<<< HEAD
=======
import com.stackoverflow.team08.enums.VoteStatus;
import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.vote.entity.QuestionVote;
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
import com.stackoverflow.team08.vote.repository.QuestionVoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

<<<<<<< HEAD
=======
import java.util.Optional;

>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
@Transactional
@Service

public class QuestionVoteService {
    private final QuestionVoteRepository questionVoteRepository;

    public QuestionVoteService (QuestionVoteRepository questionVoteRepository) {
        this.questionVoteRepository = questionVoteRepository;
    }

<<<<<<< HEAD
//    public void increaseVote(Member member, Question question) {
//        QuestionVote questionVote = findQuestionVote(member, question);
//
//        if(questionVote.getStatus().toString().equals("UP")) {
//            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
//        } else if(questionVote.getStatus().toString().equals("NONE")) {
//            questionVote.setStatus(VoteStatus.UP);
//        } else if(questionVote.getStatus().toString().equals("DOWN")) {
//            questionVote.setStatus(VoteStatus.NONE);
//        }
//
//        question.setQuestionVoteCount(question.getQuestionVoteCount() + 1);
//    }

//    public void decreaseVote(Member member, Question question) {
//        QuestionVote questionVote = findQuestionVote(member, question);
//
//        if(questionVote.getStatus().toString().equals("DOWN")) {
//            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
//        } else if(questionVote.getStatus().toString().equals("NONE")) {
//            questionVote.setStatus(VoteStatus.DOWN);
//        } else if(questionVote.getStatus().toString().equals("UP")) {
//            questionVote.setStatus(VoteStatus.NONE);
//        }
//
//        question.setQuestionVoteCount(question.getQuestionVoteCount() - 1);
//    }

//    public QuestionVote findQuestionVote(Member member, Question question) {
//        Optional<QuestionVote> findQuestionVote = questionVoteRepository.findByMemberAndQuestion(member, question);
//
//        return !findQuestionVote.isPresent() ? createVote(member, question) : findQuestionVote.get();
//    }

//    public QuestionVote createVote (Member member, Question question) {
//        QuestionVote questionVote = QuestionVote.builder()
//                .status(VoteStatus.NONE)
//                .member(member)
//                .question(question)
//                .build();
//
//        return questionVoteRepository.save(questionVote);
//    }
=======
    public void increaseVote(Member member, Question question) {
        QuestionVote questionVote = findQuestionVote(member, question);

        if(questionVote.getStatus().toString().equals("UP")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if(questionVote.getStatus().toString().equals("NONE")) {
            questionVote.setStatus(VoteStatus.UP);
        } else if(questionVote.getStatus().toString().equals("DOWN")) {
            questionVote.setStatus(VoteStatus.NONE);
        }

        question.setQuestionVoteCount(question.getQuestionVoteCount() + 1);
    }

    public void decreaseVote(Member member, Question question) {
        QuestionVote questionVote = findQuestionVote(member, question);

        if(questionVote.getStatus().toString().equals("DOWN")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if(questionVote.getStatus().toString().equals("NONE")) {
            questionVote.setStatus(VoteStatus.DOWN);
        } else if(questionVote.getStatus().toString().equals("UP")) {
            questionVote.setStatus(VoteStatus.NONE);
        }

        question.setQuestionVoteCount(question.getQuestionVoteCount() - 1);
    }

    public QuestionVote findQuestionVote(Member member, Question question) {
        Optional<QuestionVote> findQuestionVote = questionVoteRepository.findByMemberAndQuestion(member, question);

        return !findQuestionVote.isPresent() ? createVote(member, question) : findQuestionVote.get();
    }

    public QuestionVote createVote (Member member, Question question) {
        QuestionVote questionVote = QuestionVote.builder()
                .status(VoteStatus.NONE)
                .member(member)
                .question(question)
                .build();


        return questionVoteRepository.save(questionVote);
    }
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d


}
