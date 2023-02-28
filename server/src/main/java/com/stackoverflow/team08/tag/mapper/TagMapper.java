package com.stackoverflow.team08.tag.mapper;

import com.stackoverflow.team08.question.entity.QuestionTag;
import com.stackoverflow.team08.tag.dto.TagResponseDto;
import com.stackoverflow.team08.tag.entity.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagResponseDto tagToTagResponse(Tag tag);

    default TagResponseDto map(QuestionTag questionTag) {
        return tagToTagResponse(questionTag.getTag());
    }
}
