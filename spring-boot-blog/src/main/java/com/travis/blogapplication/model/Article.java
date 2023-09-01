package com.travis.blogapplication.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "articles")
@Data
public class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String name;
	
	private String title;
	
	@Lob
	@Column(length = 10000)
	private List<String> content;
	
	@ManyToOne
	@JoinColumn(name = "author_id")
	private User author;
	
    private LocalDateTime creationDateTime; // Add LocalDateTime attribute

    @PrePersist // Add PrePersist annotation
    public void setCreationDateTime() {
        creationDateTime = LocalDateTime.now(); // Set the current date and time when the object is created
    }
	
	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
	@JoinTable(
	        name="articles_comments",
	        joinColumns = @JoinColumn(name="article_id"),
	        inverseJoinColumns = @JoinColumn(name="comment_id")
	)
    private List<Comment> comments = new ArrayList<>();
}
