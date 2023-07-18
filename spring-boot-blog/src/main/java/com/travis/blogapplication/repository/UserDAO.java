package com.travis.blogapplication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travis.blogapplication.model.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {

	Optional<User> findFirstByEmail(String email);
	
	Optional<User> findFirstByUsername(String username);

}
