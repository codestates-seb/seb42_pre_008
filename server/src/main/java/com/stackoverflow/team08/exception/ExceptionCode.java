package com.stackoverflow.team08.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "존재하지 않는 이메일입니다."),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    ADOPT_ANSWER_EXIST(404, "Adopted Answer exist"),
    TAG_NOT_FOUND(404, "Tag Not Found"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    VOTE_NOT_ALLOW (405, "You're already voted"),
    MEMBER_SECESSION(404, "탈퇴한 회원입니다."),
    DISPLAY_NAME_EXISTS(404, "이미 존재하는 닉네임 입니다."),
    UNAUTHORIZED_MEMBER(401, "권한이 없는 사용자 입니다."),
    BAD_CREDENTIAL(400, "비밀번호가 맞지 않습니다.");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
