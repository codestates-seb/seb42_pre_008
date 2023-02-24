package com.stackoverflow.team08.answers.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException {
    @Getter
    ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
