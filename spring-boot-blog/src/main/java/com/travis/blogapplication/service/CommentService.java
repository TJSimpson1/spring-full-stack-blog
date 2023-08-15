package com.travis.blogapplication.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.dto.CommentDTO;
import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.Comment;
import com.travis.blogapplication.repository.CommentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    
    public CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setCommentText(comment.getCommentText());
        commentDTO.setTimePosted(comment.getTimePosted());
        commentDTO.setCommenter(comment.getCommenter());
        return commentDTO;
    }

    public List<CommentDTO> getAllComments() {
    	List<Comment> comments = commentRepository.findAll();
    	List<CommentDTO> commentDTOs = new ArrayList<>();
    	
    	for(Comment comment : comments) {
    		CommentDTO commentDTO = convertToDTO(comment);
    		commentDTOs.add(commentDTO);
    	}
        return commentDTOs;
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }
    
    public CommentDTO getCommentDTOById(Long id) {
    	Optional<Comment> comment = commentRepository.findById(id);
    	if(comment.isEmpty()) {
    		return null;
    	}
        return convertToDTO(comment.get());
    }

    public CommentDTO createComment(Comment comment, Article article) {
    	article.getComments().add(comment);
    	comment.setArticle(article);
    	CommentDTO commentDTO = convertToDTO(commentRepository.save(comment));
        return commentDTO;
    }

    public CommentDTO updateComment(Comment comment) {
    	CommentDTO commentDTO = convertToDTO(commentRepository.save(comment));
        return commentDTO;
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
