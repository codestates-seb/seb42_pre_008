package com.stackoverflow.team08.member.entity;

import com.stackoverflow.team08.member.role.MemberRole;
import com.stackoverflow.team08.member.status.MemberStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Clob;

@Entity
@Getter
@Setter
public class Member {
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

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false)
    @Lob
    private String aboutMe;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private MemberRole memberRole;


}
