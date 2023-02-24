package com.stackoverflow.team08.server.question.entity;

import com.stackoverflow.team08.server.audit.Auditable;
import com.stackoverflow.team08.server.member.entity.Member;
import com.stackoverflow.team08.server.vote.entity.QuestionVote;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String tryAndExpecting;

//    @Column(length = 30)
//    private String tag;

    @Column(name = "view_count", columnDefinition = "integer default 0", nullable = false)
    private long viewCount;


    @Column(name = "question_vote_count")
    private long questionVoteCount;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<QuestionVote> questionVotes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionTag> tags = new ArrayList<>();

    public void viewCount(Question question) {
        question.viewCount++;
    }
}


//연관관계 매핑 적용 x