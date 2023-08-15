package com.travis.blogapplication.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.dto.UserDTO;
import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.UserDAO;

@Service
public class UserService {

	@Autowired
	private UserDAO userRepository;

	public Optional<UserDTO> findUserByUsername(String username) {
		Optional<User> userOpt = userRepository.findFirstByUsername(username);

		return userOpt.map(user -> {
			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setUsername(user.getUsername());
			userDTO.setEmail(user.getEmail());
			userDTO.setName(user.getName());
			userDTO.setRole(user.getRole());
			return userDTO;
		});
	}

}
