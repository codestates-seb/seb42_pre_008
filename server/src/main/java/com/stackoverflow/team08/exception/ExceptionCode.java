package com.stackoverflow.team08.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    TAG_NOT_FOUND(404, "Tag Not Found"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    VOTE_NOT_ALLOW (405, "You're already voted"),
    MEMBER_SECESSION(404, "MEMBER_SECESSION"),
    DISPLAY_NAME_EXISTS(404, "This DisplayName is exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
