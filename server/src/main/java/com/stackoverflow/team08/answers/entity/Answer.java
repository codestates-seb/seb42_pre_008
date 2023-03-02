package com.stackoverflow.team08.answers.entity;

import com.stackoverflow.team08.audit.Auditable;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "ANSWER")
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

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
    @JoinColumn(name = "QUESTION_ID", nullable = false)
    private Question question;

    public void setQuestion(Question question) {
      this.question = question;
      if(question.getAnswers().contains(this)) {
          question.getAnswers().add(this);
      }
    }

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if(member.getAnswers().contains(this)) {
            member.getAnswers().add(this);
        }
    }
}
