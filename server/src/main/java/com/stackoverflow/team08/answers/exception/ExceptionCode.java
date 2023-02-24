package com.stackoverflow.team08.answers.exception;

import lombok.Getter;

public enum ExceptionCode {
    ANSWER_NOT_FOUNT(404, "Answer not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
