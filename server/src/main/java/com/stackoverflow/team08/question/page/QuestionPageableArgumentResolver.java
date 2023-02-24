package com.stackoverflow.team08.question.page;

import com.stackoverflow.team08.config.pageable.PageableHandlerMethodArgumentResolver;


public class QuestionPageableArgumentResolver extends PageableHandlerMethodArgumentResolver<QuestionPageRequest> {
    public QuestionPageableArgumentResolver(int defaultPageSize, int defaultSize) {
        super(defaultPageSize, defaultSize);
    }

//	@Override
//	public boolean supportsParameter(MethodParameter parameter) {
//		return QuestionPageRequest.class.isAssignableFrom(parameter.getParameterType());
//	}

    @Override
    protected QuestionPageRequest getPageRequest(int page, int size, String sortString) {
        return new QuestionPageRequest(page - 1, size, getSortingType(sortString));
    }

    private QuestionSortingType getSortingType(String sortString) {
        try {
            return QuestionSortingType.valueOf(sortString.toUpperCase());
        } catch (Exception ignore) {
            return QuestionSortingType.getDefaultSortingType();
        }
    }
}
