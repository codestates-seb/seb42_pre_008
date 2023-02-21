package com.stackoverflow.team08.member.repository;

import com.stackoverflow.team08.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
