package com.stackoverflow.team08.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GithubEmailEntity {
    private String email;
    private boolean primary;
    private boolean verified;
    private String visibility;

}
