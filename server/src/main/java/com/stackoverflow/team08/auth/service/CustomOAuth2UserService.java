package com.stackoverflow.team08.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.stackoverflow.team08.auth.attribute.OAuth2Attribute;
import com.stackoverflow.team08.member.role.MemberRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        log.info("CustomOAuth2AuthService");
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        OAuth2Attribute attributes = null;
        
        try {

            attributes = OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        } catch (JsonProcessingException e) {

            throw new RuntimeException(e);

        }

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(MemberRole.USER.getRole())),
                attributes.getAttributes(), attributes.getNameAttributeKey());
        
    }
}
