package com.stackoverflow.team08.exception;

import lombok.Getter;

public class ValidationException extends RuntimeException{
    @Getter
    private ValidationExceptionCode exceptionCode;

    public ValidationException(ValidationExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
