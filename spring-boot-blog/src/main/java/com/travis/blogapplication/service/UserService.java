package com.travis.blogapplication.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.UserDAO;

@Service
public class UserService {

	@Autowired
	private UserDAO userRepository;
	
	public Optional<User> findUserByUsername(String username) {
		return userRepository.findFirstByUsername(username);
	}

}
