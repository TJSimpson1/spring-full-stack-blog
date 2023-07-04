package com.travis.blogapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travis.blogapplication.model.User;

public interface UserDAO extends JpaRepository<User, Integer> {

}
