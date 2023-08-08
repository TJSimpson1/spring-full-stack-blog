package com.travis.blogapplication.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity(name = "authors")
@Data
@EqualsAndHashCode(callSuper = false)
@PrimaryKeyJoinColumn(name = "admin_id")
public class Author extends User {

	private static final long serialVersionUID = 3726806622822574089L;
	
	public Author() {
        this.articles = new ArrayList<>(); // Initialize the articles list
    }

	@OneToMany(mappedBy = "author")
    private List<Article> articles;
}
