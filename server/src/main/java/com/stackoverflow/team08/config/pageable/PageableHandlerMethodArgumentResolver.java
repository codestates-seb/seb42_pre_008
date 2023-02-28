package com.stackoverflow.team08.config.pageable;

import com.stackoverflow.team08.question.page.QuestionPageRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import static java.lang.Integer.parseInt;
@Getter
@Setter
public abstract class PageableHandlerMethodArgumentResolver<T extends CustomPageRequest<?>> implements HandlerMethodArgumentResolver {
    private final int defaultPageSize;

    private final int defaultSize;

    private String pageParameterName;

    private String sizeParameterName;

    private String sortParameterName;

    public PageableHandlerMethodArgumentResolver(int defaultPageSize, int defaultSize) {
        this.defaultPageSize= defaultPageSize;
        this.defaultSize = defaultSize;
    }

//    @Override
//    public boolean supportsParameter(MethodParameter parameter) {
//        return QuestionPageRequest.class.isAssignableFrom(parameter.getParameterType());
//    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String pageString = webRequest.getParameter(pageParameterName);
        String sizeString = webRequest.getParameter(sizeParameterName);
        String sortString = webRequest.getParameter(sortParameterName);

        int page = Math.max(1, parseInt(pageString, defaultPageSize));
        int size = parseInt(sizeString, defaultSize);

        return getPageRequest(page, size, sortString);
    }

    protected abstract T getPageRequest(int page, int size, String sortType);

    private Integer parseInt(String strInt, int defaultValue) {
        try {
            return Integer.parseInt(strInt);
        } catch (Exception ignore) {
            return defaultValue;
        }
    }
}
