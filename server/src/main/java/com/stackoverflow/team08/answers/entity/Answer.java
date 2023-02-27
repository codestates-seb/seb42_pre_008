package com.stackoverflow.team08.answers.entity;

import com.stackoverflow.team08.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

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

//    @ManyToOne
//    @JoinColumn(name = "QUESTION_ID")
//    private long questionId;
//
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private long memberId;

    @Column(name = "ADOPT")
    private boolean adopt;
}
