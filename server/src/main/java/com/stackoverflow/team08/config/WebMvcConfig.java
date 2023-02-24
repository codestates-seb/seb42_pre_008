package com.stackoverflow.team08.server.config;

import com.stackoverflow.team08.server.config.pageable.PageableHandlerMethodArgumentResolver;
import com.stackoverflow.team08.server.question.page.QuestionPageableArgumentResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private static final String PAGE_PARAMETER_NAME = "page";
    private static final String SIZE_PARAMETER_NAME = "size";
    private static final String SORT_PARAMETER_NAME = "sort";

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(questionPageableArgumentResolver());
    }

    @Bean
    public QuestionPageableArgumentResolver questionPageableArgumentResolver() {
        QuestionPageableArgumentResolver questionResolver = new QuestionPageableArgumentResolver(1, 15);
        setDefaultParameterNames(questionResolver);
        return questionResolver;
    }

    private void setDefaultParameterNames(PageableHandlerMethodArgumentResolver<?> resolver) {
        resolver.setPageParameterName(PAGE_PARAMETER_NAME);
        resolver.setSizeParameterName(SIZE_PARAMETER_NAME);
        resolver.setSortParameterName(SORT_PARAMETER_NAME);
    }
}
