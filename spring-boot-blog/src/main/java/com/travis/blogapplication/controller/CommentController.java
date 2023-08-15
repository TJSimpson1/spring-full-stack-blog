package com.travis.blogapplication.controller;

import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.Comment;
import com.travis.blogapplication.service.ArticleService;
import com.travis.blogapplication.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    
    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        return comment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/article/{articleId}")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment, @PathVariable Long articleId) {
        Optional<Article> article = articleService.getArticleById(articleId);
        if (article.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comment createdComment = commentService.createComment(comment, article.get());
        return ResponseEntity.ok().body(createdComment);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        if (!commentService.getCommentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        comment.setId(id);
        return ResponseEntity.ok(commentService.updateComment(comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        if (!comment.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
