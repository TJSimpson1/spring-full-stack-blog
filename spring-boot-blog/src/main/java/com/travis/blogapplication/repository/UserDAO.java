package com.travis.blogapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travis.blogapplication.model.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {

}
