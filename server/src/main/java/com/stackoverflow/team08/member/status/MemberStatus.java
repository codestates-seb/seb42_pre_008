package com.stackoverflow.team08.member.status;

import lombok.Getter;

@Getter
public enum MemberStatus {
    MEMBER_ACTIVE("MEMBER_ACTIVE", "활동중"),
    MEMBER_SECESSION("MEMBER_SECESSION", "탈퇴된 회원");

    private String key;
    private String message;

    MemberStatus(String key, String message) {
        this.key = key;
        this.message = message;
    }
}
