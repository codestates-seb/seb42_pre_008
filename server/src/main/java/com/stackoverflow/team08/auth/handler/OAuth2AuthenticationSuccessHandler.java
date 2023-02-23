package com.stackoverflow.team08.auth.handler;

import com.google.gson.Gson;
import com.stackoverflow.team08.auth.entity.GithubEmailEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final Gson gson;

    private final OAuth2AuthorizedClientService authorizedClientService;

    private final RestTemplate restTemplate;

    public OAuth2AuthenticationSuccessHandler(Gson gson, OAuth2AuthorizedClientService authorizedClientService, RestTemplateBuilder restTemplateBuilder) {
        this.gson = gson;
        this.authorizedClientService = authorizedClientService;
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("성공!");

        //String oauthId = authentication.getName();

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        log.info("token.getName() : {} ", token.getName());

        OAuth2User principal = token.getPrincipal();

        Map<String, Object> attributes = principal.getAttributes();

        String authorizedClientRegistrationId = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();

        log.info("로그인 플랫폼 : {}", authorizedClientRegistrationId);

        log.info("안에 있는 정보들 : {}", attributes);

        String email = (String) attributes.get("email");

        if(authorizedClientRegistrationId.equals("github")){

            String data = getGitHubData(token);

            log.info("data : {} ", data);

            GithubEmailEntity[] dataArray = gson.fromJson(data, GithubEmailEntity[].class);

            List<GithubEmailEntity> entities = Arrays.stream(dataArray).collect(Collectors.toList());

            String userEmail = entities.get(0).getEmail();

            log.info("userEmail : {} ", userEmail);

            email = userEmail;
        }
        // 여기서 분기를 통해 회원가입을 했을 경우 메인 페이지로
        // 없을 경우 가입하는 화면으로 이동을 해줘야 할듯
        // 문제는 로그인 유저의 값을 어떻게 넘겨줘야 하는가
        // Dto를 JSON으로 바꿔서 줘야 할 것 같기는 하다.

        String uri = UriComponentsBuilder.fromUriString("http://localhost:8080/test/user")
                .queryParam("userEmail", email)
                .build().toUriString();

        response.sendRedirect(uri);
    }
    
    // 따로 분리가 필요해보임
    public String getGitHubData(OAuth2AuthenticationToken authentication) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient("github", authentication.getName());
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(client.getAccessToken().getTokenValue());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange("https://api.github.com/user/emails", HttpMethod.GET, entity, String.class);
        return response.getBody();
    }
}
