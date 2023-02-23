package com.stackoverflow.team08.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test/user")
    public String testIndex(String data){

        return data;

    }

    @GetMapping("/test/logout")
    public String testLogout(){

        return "logout";

    }
}
