package com.travis.blogapplication.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travis.blogapplication.dto.CommentDTO;
import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.Comment;
import com.travis.blogapplication.service.ArticleService;
import com.travis.blogapplication.service.CommentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
    public List<CommentDTO> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long id) {
        CommentDTO comment = commentService.getCommentDTOById(id);
        if(comment == null) {
        	return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(comment);
    }
    
    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByArticleId(@PathVariable Long articleId) {
        List<CommentDTO> comments = commentService.getCommentDTOsByArticleId(articleId);
        return ResponseEntity.ok().body(comments);
    }

    @PostMapping("/article/{articleId}")
    public ResponseEntity<CommentDTO> createComment(@RequestBody Comment comment, @PathVariable Long articleId) {
        Optional<Article> article = articleService.findById(articleId);
        if (article.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CommentDTO createdComment = commentService.createComment(comment, article.get());
        return ResponseEntity.ok().body(createdComment);
    }


    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
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
        comment.get().getArticle().getComments().remove(comment.get());
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
