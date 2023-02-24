package com.stackoverflow.team08.answers.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @Column(name = "VOTE")
    private long vote;

    @Column(nullable = false, name = "CONTENT")
    private String content;

    @Column(nullable = false, name = "CREATE_AT")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

//    @ManyToOne
//    @JoinColumn(name = "QUESTION_ID")
//    private long questionId;

    @Column(name = "ADOPT")
    private boolean adopt;
}
