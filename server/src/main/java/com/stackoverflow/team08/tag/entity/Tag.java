package com.stackoverflow.team08.tag.entity;

import com.stackoverflow.team08.question.entity.QuestionTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", updatable = false)
    private Long tagId;

    @Column(name = "tag_name", nullable = false, updatable = false, unique = true)
    private String tagName;

    @Column(name = "tag_body", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String tagBody;

    @OneToMany(mappedBy = "tag")
    private List<QuestionTag> questionTags = new ArrayList<>();

    public Tag (String tagName) {
        this.tagName = tagName;
    }

    public Tag(String tagName, String tagBody) {
        this.tagName = tagName;
        this.tagBody = tagBody;
    }
}
