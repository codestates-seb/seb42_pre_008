package com.stackoverflow.team08.answers.entity;

import com.stackoverflow.team08.audit.Auditable;
<<<<<<< HEAD
import com.stackoverflow.team08.member.entity.Member;
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
import com.stackoverflow.team08.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
<<<<<<< HEAD
import javax.validation.constraints.NotBlank;
=======
import java.time.LocalDateTime;
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d

@Getter
@Setter
@NoArgsConstructor
<<<<<<< HEAD
@Entity(name = "ANSWER")
=======
@Entity
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

<<<<<<< HEAD
    @NotBlank
    @Column(nullable = false, name = "CONTENT")
    private String content;

    @OneToOne(mappedBy = "answer", cascade = CascadeType.PERSIST)
    private AnswerVote answerVote;

    public void setAnswerVote(AnswerVote answerVote) {
        this.answerVote = answerVote;
        if(answerVote.getAnswer() != this) {
            answerVote.setAnswer(this);
        }
    }

    @Column(name = "ADOPT")
    private boolean adopt;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    public void setQuestion(Question question) {
      this.question = question;
      if(question.getAnswers().contains(this)) {
          question.getAnswers().add(this);
      }
    }
//
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    public void setMember(Member member) {
//        this.member = member;
//        if(member.getAnswers().contains(this) {
//            member.getAnswers().add(this)
//        }
//    }
=======
    @Column(name = "VOTE")
    private long vote;

    @Column(nullable = false, name = "CONTENT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

//    @ManyToOne
//    @JoinColumn(name = "QUESTION_ID")
//    private long questionId;

    @Column(name = "ADOPT")
    private boolean adopt;
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
}
