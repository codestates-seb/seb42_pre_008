package com.stackoverflow.team08.member.entity;

import com.stackoverflow.team08.answers.entity.Answer;
import com.stackoverflow.team08.audit.Auditable;
import com.stackoverflow.team08.member.role.MemberRole;
import com.stackoverflow.team08.member.status.MemberStatus;
import com.stackoverflow.team08.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, length = 100)
    private String displayName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 100)
    private String memberImage;

    @Column(length = 100)
    private String location;

    @Column
    @Lob
    private String aboutMe;

    @Column
    private String refreshToken;

    @Column
    private boolean authentication;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private MemberRole memberRole = MemberRole.USER;

    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    public void addAnswer(Answer answer) {
        answers.add(answer);
        if(answer.getMember() != this) {
            answer.setMember(this);
        }
    }

    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    public void addQuestion(Question question) {
        questions.add(question);
        if(question.getMember() != this) {
            question.setMember(this);
        }
    }

    @Builder
    public Member(long memberId, String displayName, String email, String password, String memberImage, String location, String aboutMe, String refreshToken, boolean authentication) {
        this.memberId = memberId;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.memberImage = memberImage;
        this.location = location;
        this.aboutMe = aboutMe;
        this.refreshToken = refreshToken;
        this.authentication = authentication;
    }
}
