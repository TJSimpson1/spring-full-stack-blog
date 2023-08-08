package com.travis.blogapplication.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.dto.ArticleDTO;
import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.Author;
import com.travis.blogapplication.repository.ArticleRepository;
import com.travis.blogapplication.repository.AuthorRepository;

import jakarta.transaction.Transactional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;
    
    @Autowired
    private AuthorRepository authorRepository;
    
    private ArticleDTO convertToDTO(Article article) {
        ArticleDTO articleDTO = new ArticleDTO();
        articleDTO.setId(article.getId());
        articleDTO.setName(article.getName());
        articleDTO.setTitle(article.getTitle());
        articleDTO.setContent(article.getContent());
        articleDTO.setAuthorId(article.getAuthor().getId());
        return articleDTO;
    }

    @Transactional
    public Article createArticle(Article article) {
    	if (articleRepository.existsByName(article.getName())) {
            throw new IllegalArgumentException("Article with the same name already exists.");
        }
    	Article savedArticle = articleRepository.save(article);

        // Update the author's list of articles
        Optional<Author> author = authorRepository.findById(savedArticle.getAuthor().getId());
        if(author.isEmpty()) {
        	throw new NoSuchElementException("Author not found for article ID: " + savedArticle.getId());
        }
        Author authorEntity = author.get();
        authorEntity.getArticles().add(savedArticle);
        authorRepository.save(authorEntity);

        return savedArticle;
    }

    
    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    
    public List<ArticleDTO> getAllArticles() {
    	List<Article> articles = articleRepository.findAll();
        List<ArticleDTO> articleDTOs = new ArrayList<>();
        
        for (Article article : articles) {
            ArticleDTO articleDTO = convertToDTO(article);
            articleDTOs.add(articleDTO);
        }
        
        return articleDTOs;
    }

    
    public Article updateArticle(Long id, Article updatedArticle) {
        Optional<Article> existingArticle = articleRepository.findById(id);
        if (existingArticle.isPresent()) {
            Article article = existingArticle.get();
            // Update the fields of the existing article with the values from the updatedArticle
            article.setName(updatedArticle.getName());
            article.setTitle(updatedArticle.getTitle());
            article.setContent(updatedArticle.getContent());
            // Save the updated article
            return articleRepository.save(article);
        }
        return null; // Article not found
    }

    
    public boolean deleteArticle(Long id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
            return true; // Article deleted
        }
        return false; // Article not found
    }
}