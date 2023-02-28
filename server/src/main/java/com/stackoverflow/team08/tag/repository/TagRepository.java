package com.stackoverflow.team08.tag.repository;

import com.stackoverflow.team08.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);

    List<Tag> findAllByTagNameIn(List<String> tagNames);
}
