package com.stackoverflow.team08;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class Team08Application {

	public static void main(String[] args) {
		SpringApplication.run(Team08Application.class, args);
	}

}
