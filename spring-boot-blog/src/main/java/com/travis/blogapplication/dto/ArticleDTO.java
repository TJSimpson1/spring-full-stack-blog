package com.travis.blogapplication.dto;

import java.util.List;

import lombok.Data;

@Data
public class ArticleDTO {

    private Long id;
    private String name;
    private String title;
    private List<String> content;
    private Long authorId;

}
