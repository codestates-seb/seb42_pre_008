package com.stackoverflow.team08.answers.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponseDto {
    private long answerId;
    private String content;
<<<<<<< HEAD
    private int voteCount;
=======
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    private boolean adopt;
}
