package com.stackoverflow.team08.answers.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerPostDto {
    @NotBlank(message = "내용을 입력하세요")
    private String content;
<<<<<<< HEAD

    private boolean adopt;
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
}
