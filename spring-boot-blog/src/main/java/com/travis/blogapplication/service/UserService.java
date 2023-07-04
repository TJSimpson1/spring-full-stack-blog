package com.travis.blogapplication.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.UserDAO;

@Service
public class UserService {
	
	@Autowired
	private UserDAO userDAO;

	public List<User> getAllUsers() {
		return userDAO.findAll();
	}

	public Optional<User> getUserById(int id) {
		return userDAO.findById(id);
	}

	public User createUser(User user) {
		Optional<User> existingUser = userDAO.findById(user.getId());
		if(existingUser.isPresent()) {
			return null;
		}
		return userDAO.save(user);
	}

	public boolean deleteUser(int id) {
		if(userDAO.existsById(id)) {
			userDAO.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean updateUser(User user) {
		if(userDAO.existsById(user.getId())) {
			userDAO.save(user);
			return true;
		}
		return false;
	}

}
