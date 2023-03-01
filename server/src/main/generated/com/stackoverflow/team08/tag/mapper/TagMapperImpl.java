package com.stackoverflow.team08.tag.mapper;

import com.stackoverflow.team08.tag.dto.TagResponseDto;
import com.stackoverflow.team08.tag.entity.Tag;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-01T16:34:01+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class TagMapperImpl implements TagMapper {

    @Override
    public TagResponseDto tagToTagResponse(Tag tag) {
        if ( tag == null ) {
            return null;
        }

        TagResponseDto tagResponseDto = new TagResponseDto();

        return tagResponseDto;
    }
}
