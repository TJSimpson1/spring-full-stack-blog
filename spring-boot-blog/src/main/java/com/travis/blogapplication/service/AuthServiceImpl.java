package com.travis.blogapplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.dto.SignupRequest;
import com.travis.blogapplication.dto.UserDTO;
import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.UserDAO;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired UserDAO userRepository;

	@Override
	public UserDTO createUser(SignupRequest signupRequest) {
		User user = new User();
		user.setEmail(signupRequest.getEmail());
		user.setName(signupRequest.getName());
		user.setUsername(signupRequest.getUsername());
		user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
		User createdUser = userRepository.save(user);
		UserDTO userDTO = new UserDTO();
		userDTO.setId(createdUser.getId());
		userDTO.setEmail(createdUser.getEmail());
		userDTO.setName(createdUser.getName());
		userDTO.setUsername(createdUser.getUsername());
		return userDTO;
		
	}

}
