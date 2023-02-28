package com.stackoverflow.team08.tag.service;

import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
import com.stackoverflow.team08.tag.entity.Tag;
import com.stackoverflow.team08.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TagService {
    private final TagRepository tagRepository;

    public Tag findBy(String tagName) {
        return findExistsTagBy(tagName);
    }

    public List<Tag> findAllBy(List<String> tagNames) {
        return tagRepository.findAllByTagNameIn(
                tagNames.stream().map(String::toLowerCase).collect(Collectors.toList())
        );
    }

    private Tag findExistsTagBy(String tagName) {
        return tagRepository.findByTagName(tagName.toLowerCase())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
    }
}
