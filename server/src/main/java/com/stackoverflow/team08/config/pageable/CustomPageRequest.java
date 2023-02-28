package com.stackoverflow.team08.config.pageable;

import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
@Getter
public abstract class CustomPageRequest <E extends Enum<?>> {
    private final int page;
    private final int size;
    private final E sortType;

    public CustomPageRequest(int page, int size, E sortType) {
        this.page = page;
        this.size = size;
        this.sortType = sortType;
    }

    public PageRequest of(Sort sort) {
        return PageRequest.of(page, size, sort);
    }

    public PageRequest of() {
<<<<<<< HEAD
        return of(Sort.by("Newest").descending());
=======
        return of(Sort.by("createdAt").descending());
    }

    public PageRequest unsorted() {
        return of(Sort.unsorted());
>>>>>>> 87fd81608c10976510178d0206f8e9e4776fa75d
    }
}
