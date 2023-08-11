package com.travis.blogapplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.User;

public interface ArticleRepository extends JpaRepository<Article, Long> {

	boolean existsByName(String name);
	
	List<Article> getArticlesByAuthor(User author);

}
