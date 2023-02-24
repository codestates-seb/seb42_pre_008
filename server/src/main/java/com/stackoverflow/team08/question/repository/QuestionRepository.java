package com.stackoverflow.team08.question.repository;

import com.stackoverflow.team08.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
//    Optional<Question> findByQuestionId(Long questionId);
//// 조회수
////    @Modifying
////    @Query("update Question q set q.viewCount = q.viewCount + 1 where q.questionId = :questionId")
//    int updateView(@Param("questionId") Long questionId);

    //Newest
//    Page<Question> findAllByCreatedDesc(Pageable pageable);

    //Unanswered
//    @Query(value = "SELECT q FROM Question q WHERE NOT EXISTS(SELECT 1 FROM Answer a.question = q)" )
//    Page<Question> findAllByAnswersEmpty(Pageable pageable);

    //Answered
//    @Query(value = "SELECT q FROM Question q WHERE EXISTS(SELECT 1 FROM Answer a.question = q)")
//    Page<Question> findAllByAnswersExistQuestion(Pageable pageable);

    //Newest(Search)
//    @Query(value = "SELECT q FROM Question q WHERE q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'")
//    Page<Question> findAllByTitleOrContentLike(String query, Pageable pageable);

    //Unanswered(Search)
//    @Query(value = "SELECT q FROM Question q WHERE NOT EXISTS(SELECT 1 FROM Answer a.question = q) and (q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'))")
//    Page<Question> findAllByAnswersIsEmptyAndTitleOrContentLike(String query, Pageable pageable);

    //Answered
//    @Query(value = "SELECT q FROM Question q WHERE EXISTS(SELECT 1 FROM Answer a.question = q) and (q.title like concat('%', :query, '%') or q.content like concat('%', :query, '%'))")
//    Page<Question> findAllByAnswersIsExistAndTitleOrContentLike(String query, Pageable pageable);
}
