package com.stackoverflow.team08.question.repository;

import com.stackoverflow.team08.question.entity.Question;
import com.stackoverflow.team08.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Long> {
//    Optional<Question> findByQuestionId(Long questionId);
//// 조회수
////    @Modifying
////    @Query("update Question q set q.viewCount = q.viewCount + 1 where q.questionId = :questionId")
//    int updateView(@Param("questionId") Long questionId);

//    Newest
    Page<Question> findAll(Pageable pageable);

    //NEWEST (TAG)
    @Query(value = "SELECT q FROM Question q INNER JOIN QuestionTag qt WHERE qt.tag = :tag")
    Page<Question> findAllByTag(Tag tag, Pageable pageable);

    //Unanswered (TAG)
    @Query(value = "SELECT q FROM Question q INNER JOIN QuestionTag qt WHERE qt.tag = :tag AND NOT EXISTS(SELECT 1 FROM ANSWER a WHERE a.question = q)")
    Page<Question> findAllByTagAndAnswersEmpty(Tag tag, Pageable pageable);

    //Answered (TAG)

    @Query(value = "SELECT q FROM Question q INNER JOIN QuestionTag qt WHERE qt.tag = :tag AND EXISTS(SELECT 1 FROM ANSWER a WHERE a.question = q)" )
    Page<Question> findAllByTagAndAnswersExist(Tag tag, Pageable pageable);

//    Unanswered
    @Query(value = "SELECT q FROM Question q WHERE NOT EXISTS (SELECT 1 FROM ANSWER a where a.question = q)" )
    Page<Question> findAllByAnswersEmpty(Pageable pageable);

//    Answered
    @Query(value = "SELECT q FROM Question q WHERE EXISTS(SELECT 1 FROM ANSWER a where a.question = q)")
    Page<Question> findAllByAnswersExistQuestion(Pageable pageable);

//    Newest(Search)
    @Query(value = "SELECT q FROM Question q WHERE q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%')")
    Page<Question> findAllByTitleOrContentLike(String query, Pageable pageable);

//    Unanswered(Search)
//    @Query(value = "SELECT q FROM Question q WHERE NOT EXISTS(SELECT 1 FROM Answer a.question = q) and (q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'))")
    @Query("select q from Question q "
        + "where not exists (select 1 from ANSWER a where a.question = q) "
        + "and (q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'))")
    Page<Question> findAllByAnswersIsEmptyAndTitleOrContentLike(String query, Pageable pageable);

//    Answered
//    @Query(value = "SELECT q FROM Question q WHERE EXISTS(SELECT 1 FROM Answer a.question = q) and (q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'))")
    @Query("select q from Question q "
        + "where exists (select 1 from ANSWER a where a.question = q) "
        + "and (q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'))")
    Page<Question> findAllByAnswersIsExistAndTitleOrContentLike(String query, Pageable pageable);
}
