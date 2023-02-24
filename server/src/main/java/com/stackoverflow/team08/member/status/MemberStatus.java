package com.stackoverflow.team08.member.status;

import lombok.Getter;

@Getter
public enum MemberStatus {
    MEMBER_ACTIVE("MEMBER_ACTIVE"),
    MEMBER_SECESSION("MEMBER_SECESSION");

    private String message;

    MemberStatus(String message) {

        this.message = message;
    }
}
