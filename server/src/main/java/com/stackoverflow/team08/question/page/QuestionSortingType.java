package com.stackoverflow.team08.question.page;

public enum QuestionSortingType {
    NEWEST,UNANSWERED, ANSWERED;

    public static QuestionSortingType getDefaultSortingType() {
        return NEWEST;
    }
}


