package com.stackoverflow.team08.auth.utils;

import com.stackoverflow.team08.member.role.MemberRole;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    @Value("${mail.address.admin}")
    private String adminMailAddress;


    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList(MemberRole.ADMIN.getRole(), MemberRole.USER.getRole());


    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList(MemberRole.USER.getRole());

    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    public List<GrantedAuthority> createAuthorities(String email) {

        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES;
        }
        return USER_ROLES;
    }

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // (2)
                .collect(Collectors.toList());
        return authorities;
    }

    public List<GrantedAuthority> createAuthoritiesToMemberRoles(String roles){
        if(roles.equals("ROLE_USER")){
            return createAuthorities(USER_ROLES_STRING);
        }else{
            return createAuthorities(ADMIN_ROLES_STRING);
        }
    }

    public List<String> createRoles(String email) {
        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
