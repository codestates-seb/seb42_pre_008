package com.stackoverflow.team08.vote.entity;

import com.stackoverflow.team08.audit.Auditable;
import com.stackoverflow.team08.enums.VoteStatus;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode
@Builder
public class QuestionVote extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_vote_id")
    private Long questionVoteId;

    @Enumerated(EnumType.STRING)
    private VoteStatus status;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
