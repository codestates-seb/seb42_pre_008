package com.stackoverflow.team08.answers.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AnswerVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerVoteId;

    private int voteCount;

    @OneToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    public void setAnswer(Answer answer) {
        this.answer = answer;
        if(answer.getAnswerVote() != this) {
            answer.setAnswerVote(this);
        }
    }

    public void voteUP() {
        voteCount += 1;
    }

    public void voteDown() {
        voteCount -= 1;
    }
}
