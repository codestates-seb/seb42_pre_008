package com.stackoverflow.team08.server.question.page;

import com.stackoverflow.team08.server.config.pageable.CustomPageRequest;

public class QuestionPageRequest extends CustomPageRequest<QuestionSortingType> {
    public QuestionPageRequest(int page, int size, QuestionSortingType sortType) {
        super(page, size, sortType);
    }
}
