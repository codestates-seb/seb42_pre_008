package com.stackoverflow.team08.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.stackoverflow.team08.config.pageable.PageableHandlerMethodArgumentResolver;
import com.stackoverflow.team08.question.page.QuestionPageableArgumentResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
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
        QuestionPageableArgumentResolver questionResolver = new QuestionPageableArgumentResolver(1, 2);
        setDefaultParameterNames(questionResolver);
        return questionResolver;
    }

    private void setDefaultParameterNames(PageableHandlerMethodArgumentResolver<?> resolver) {
        resolver.setPageParameterName(PAGE_PARAMETER_NAME);
        resolver.setSizeParameterName(SIZE_PARAMETER_NAME);
        resolver.setSortParameterName(SORT_PARAMETER_NAME);
    }

    @Bean
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        return new Jackson2ObjectMapperBuilder()
                .serializationInclusion(JsonInclude.Include.NON_NULL)
                .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .visibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
                .visibility(PropertyAccessor.GETTER, JsonAutoDetect.Visibility.NONE)
                .visibility(PropertyAccessor.IS_GETTER, JsonAutoDetect.Visibility.NONE);
    }
}
