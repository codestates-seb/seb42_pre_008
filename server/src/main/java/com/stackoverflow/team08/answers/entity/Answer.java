package com.stackoverflow.team08.answers.entity;

import com.stackoverflow.team08.answers.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(name = "VOTE")
    private long vote;

    @Column(nullable = false, name = "CONTENT")
    private String content;

//    @ManyToOne
//    @JoinColumn(name = "QUESTION_ID")
//    private long questionId;

    @Column(name = "ADOPT")
    private boolean adopt;
}
