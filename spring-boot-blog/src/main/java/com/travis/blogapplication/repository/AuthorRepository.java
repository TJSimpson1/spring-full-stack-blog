package com.travis.blogapplication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travis.blogapplication.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

	Optional<Author> findFirstByUsername(String username); 

}
