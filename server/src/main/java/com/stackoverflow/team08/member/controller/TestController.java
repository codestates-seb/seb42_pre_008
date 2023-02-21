package com.stackoverflow.team08.member.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test/index")
    public String testIndex(){

        return "index";

    }

    @GetMapping("/test/logout")
    public String testLogout(){

        return "logout";

    }
}
