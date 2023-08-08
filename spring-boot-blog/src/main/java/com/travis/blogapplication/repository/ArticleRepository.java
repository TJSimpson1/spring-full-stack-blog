package com.travis.blogapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travis.blogapplication.model.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {

	boolean existsByName(String name);

}
