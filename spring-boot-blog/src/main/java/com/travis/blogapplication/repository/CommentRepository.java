package com.travis.blogapplication.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.travis.blogapplication.dto.CommentDTO;
import com.travis.blogapplication.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByArticleId(Long articleId);
	List<Comment> findByArticleIdAndParentCommentIsNull(Long articleId);
	Page<Comment> findByArticleIdAndParentCommentIsNull(Long articleId, Pageable pageable);
    List<Comment> findByParentCommentId(Long parentCommentId);

}
