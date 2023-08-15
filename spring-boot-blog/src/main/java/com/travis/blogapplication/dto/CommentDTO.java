package com.travis.blogapplication.dto;

import java.time.LocalDateTime;

import com.travis.blogapplication.model.User;

import lombok.Data;

@Data
public class CommentDTO {

	private Long id;
	private String commentText;
	private LocalDateTime timePosted;
	private User commenter;

}
