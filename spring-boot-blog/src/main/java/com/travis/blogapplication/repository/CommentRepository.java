package com.travis.blogapplication.repository;

import com.travis.blogapplication.model.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByArticleId(Long articleId);

}
