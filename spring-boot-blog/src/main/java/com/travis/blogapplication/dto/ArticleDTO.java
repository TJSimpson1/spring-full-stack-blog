package com.travis.blogapplication.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.travis.blogapplication.model.User;

import lombok.Data;

@Data
public class ArticleDTO {

    private Long id;
    private String name;
    private String title;
    private List<String> content;
    private User author;
    private LocalDateTime creationDateTime;

}
