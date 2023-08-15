package com.travis.blogapplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travis.blogapplication.dto.ArticleDTO;
import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.User;
import com.travis.blogapplication.service.ArticleService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    // Create an article
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article createdArticle = articleService.createArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdArticle);
    }

    // Read an article by ID
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable Long id) {
        ArticleDTO article = articleService.getArticleById(id);
        if(article == null) {
        	return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(article);
    }
    
    @GetMapping("/author")
    public ResponseEntity<List<Article>> getArticleByAuthor(@RequestBody User author){
    	List<Article> articles = articleService.getArticlesByAuthor(author);
    	return ResponseEntity.ok(articles);
    }

    // Read all articles
    @GetMapping
    public ResponseEntity<List<ArticleDTO>> getAllArticles() {
        List<ArticleDTO> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    // Update an article by ID
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article article) {
        Article updatedArticle = articleService.updateArticle(id, article);
        if (updatedArticle != null) {
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an article by ID
    @DeleteMapping("/{id}/author/{username}")
    @PreAuthorize("isAuthenticated() and (#username == authentication.principal.username or hasRole('ADMIN'))")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id, @PathVariable String username) {
        boolean deleted = articleService.deleteArticle(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}