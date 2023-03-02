package com.stackoverflow.team08.question.service;

import com.stackoverflow.team08.config.pageable.CustomPageRequest;
import com.stackoverflow.team08.exception.BusinessLogicException;
import com.stackoverflow.team08.exception.ExceptionCode;
import com.stackoverflow.team08.member.entity.Member;
import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.question.page.QuestionPageRequest;
import com.stackoverflow.team08.question.page.QuestionSortingType;
import com.stackoverflow.team08.question.repository.QuestionRepository;
import com.stackoverflow.team08.tag.entity.Tag;
import com.stackoverflow.team08.tag.repository.TagRepository;
import com.stackoverflow.team08.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    private final TagService tagService;

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

//    @Transactional
//    public Question write(Question question, Member member) {
//        List<Tag> tags = tagService.findAllBy(question.getTagNames());
//        question = new Question(member, question.getTitle(), question.getContent(), tags);
//        question = save(question);
//        return question;
//    }

//    private Question save(Question question) {
//        return questionRepository.save(question);
//    }

    public Question updateQuestion(Question question) {
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
//        질문을 수정할 때 질문 작성자만 가능해야 함

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getTryAndExpecting())
                .ifPresent(tryAndExpecting -> findQuestion.setTryAndExpecting(tryAndExpecting));
        Optional.ofNullable(question.getQuestionTags())
                .ifPresent(questionTags -> findQuestion.setQuestionTags(questionTags));


        return questionRepository.save(findQuestion);
    }

    @Transactional(readOnly = true)
    public Question findQuestion(long questionId) {
        return findVerifiedQuestion(questionId);
    }

    public Page<Question> findAll(CustomPageRequest<QuestionSortingType> pageRequest) {
        switch (pageRequest.getSortType()) {
            case NEWEST:
                return questionRepository.findAll(pageRequest.of());
            case ANSWERED:
                return questionRepository.findAllByAnswersExistQuestion(pageRequest.of());
            case UNANSWERED:
                return questionRepository.findAllByAnswersEmpty(pageRequest.of());
            default:
                throw new RuntimeException("Unexpected exception occurred.");
        }
    }
//    모든 질문 pageNation 까지 되는
//        public Page<Question> findAll(Pageable pageable) {
//            return questionRepository.findAll(pageable);
//        }

//    public Page<Question> findAllQuestions(CustomPageRequest<QuestionSortingType> pageRequest) {
//        Pageable pageable = CustomPageRequest;
//        return questionRepository.findAll(pageable);
//    }

    public Page<Question> search(String query, QuestionPageRequest pageRequest) {
        switch (pageRequest.getSortType()) {
            case NEWEST:
                return questionRepository.findAllByTitleOrContentLike(query, pageRequest.of());
            case ANSWERED:
                return questionRepository.findAllByAnswersIsExistAndTitleOrContentLike(query, pageRequest.of());
            case UNANSWERED:
                return questionRepository.findAllByAnswersIsEmptyAndTitleOrContentLike(query, pageRequest.of());
            default:
                throw new RuntimeException("Unexpected exception occurred.");
        }
    }

    public Page<Question> findAllByTag(String tagName, QuestionPageRequest pageRequest) {
        Tag tag = tagService.findBy(tagName);
        switch (pageRequest.getSortType()) {
            case NEWEST:
                return questionRepository.findAllByTag(tag, pageRequest.of());
            case ANSWERED:
                return questionRepository.findAllByTagAndAnswersExist(tag, pageRequest.of());
            case UNANSWERED:
                return questionRepository.findAllByTagAndAnswersEmpty(tag, pageRequest.of());
            default:
                throw new RuntimeException("Unexpected exception occurred.");
        }
    }

//    public Page<Question> findQuestions(int page, int size) {
//        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
//
//    public Page<Question> findUnansweredQuestions(int page, int size) {
//        return questionRepository.findAllByAnswersEmpty(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
//
//    public Page<Question> findAnsweredQuestions(int page, int size) {
//        return questionRepository.findAllByAnswersExistQuestion(PageRequest.of(page, size, Sort.by("questionId").descending()));
//    }
//
//    @Transactional
//    public int viewCountUp(Long questionId) {
//        return questionRepository.updateView(questionId);
//    }
    //this. 생략

    @Transactional
    public void viewCountUp(Long questionId) {
        Question question = findQuestion(questionId);
        question.viewCount(question);
    }

    public void deleteQuestion(long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);

        questionRepository.delete(findQuestion);
    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;
    }

    public long findQuestionCount() {
        List<Question> questions = questionRepository.findAll();

        return questions.size();
    }
    private Question save(Question question) {
        return questionRepository.save(question);
    }

}
