package com.stackoverflow.team08.question.entity;

import com.stackoverflow.team08.audit.Auditable;
import com.stackoverflow.team08.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = @UniqueConstraint(name = "unq_question_tag", columnNames = {"tag_id", "question_id"}))
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public QuestionTag(Tag tag, Question question) {
        this.tag = tag;
        this.question = question;
    }



}
