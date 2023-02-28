package com.stackoverflow.team08.tag.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

public class TagResponseDto {
    @Getter
    @Setter
    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    public static class Response {
        private long tagId;
        private String tagName;
        private String tagBody;
    }
}
