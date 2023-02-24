//package com.stackoverflow.team08.server.tag.entity;
//
//import com.stackoverflow.team08.server.question.entity.QuestionTag;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@Entity
//public class Tag {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long tagId;
//
//    @Column(nullable = false, updatable = false, unique = true)
//    private String name;
//
//    @Column(nullable = false)
//    private String description;
//
//    @OneToMany(mappedBy = "tag")
//    private List<QuestionTag> questionTags = new ArrayList<>();
//}
