package com.stackoverflow.team08.question.page;

import com.stackoverflow.team08.config.pageable.CustomPageRequest;

public class QuestionPageRequest extends CustomPageRequest<QuestionSortingType> {
    public QuestionPageRequest(int page, int size, QuestionSortingType sortType) {
        super(page, size, sortType);
    }
}
