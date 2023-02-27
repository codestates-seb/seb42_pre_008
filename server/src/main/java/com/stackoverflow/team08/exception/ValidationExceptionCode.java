package com.stackoverflow.team08.exception;

import lombok.Getter;

public enum ValidationExceptionCode {
    DISPLAY_NAME_FAILED(400, "닉네임은 특수문자를 포함하지 않은 영어(대, 소문자), 한글, 숫자 2글자이상으로 이루어져야 합니다."),
    LOCATION_FAILED(400, "위치는 영어,한글 2글자이상으로 작성해주세요"),
    MEMBER_IMAGE_URL_FAILED(400, "URL 형식이 아닙니다.");
    @Getter
    private int status;

    @Getter
    private String message;

    ValidationExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
