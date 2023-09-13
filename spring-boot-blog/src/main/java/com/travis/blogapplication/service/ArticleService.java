package com.travis.blogapplication.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.travis.blogapplication.dto.ArticleDTO;
import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.ArticleRepository;


@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;
    
    public ArticleDTO convertToDTO(Article article) {
        ArticleDTO articleDTO = new ArticleDTO();
        articleDTO.setId(article.getId());
        articleDTO.setName(article.getName());
        articleDTO.setTitle(article.getTitle());
        articleDTO.setContent(article.getContent());
        articleDTO.setAuthor(article.getAuthor());
        articleDTO.setUserLikes(article.getUserLikes());
        articleDTO.setCreationDateTime(article.getCreationDateTime());
        return articleDTO;
    }

    @Transactional
    public Article createArticle(Article article) {
    	if (articleRepository.existsByName(article.getName())) {
            throw new IllegalArgumentException("Article with the same name already exists.");
        }
    	return articleRepository.save(article);
    }

    public Optional<Article> findById(Long id) {
        return articleRepository.findById(id);
    }
    
    public ArticleDTO getArticleDTOById(Long id) {
        Optional<Article> article = articleRepository.findById(id);
        if(article.isPresent()) {
        	return convertToDTO(article.get());
        }
        return null;
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
            article.setUserLikes(updatedArticle.getUserLikes());
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

	public List<Article> getArticlesByAuthor(User author) {
		return articleRepository.getArticlesByAuthor(author);
	}
}