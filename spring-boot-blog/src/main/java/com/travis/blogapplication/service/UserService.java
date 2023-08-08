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
		UserDTO userDTO = new UserDTO();
		if(userOpt.isEmpty()) {
			return Optional.of(null);
		}
		User user = userOpt.get();
		userDTO.setId(user.getId());
		userDTO.setUsername(user.getUsername());
		userDTO.setEmail(user.getEmail());
		userDTO.setName(user.getName());
		userDTO.setRole(user.getRole());
		return Optional.of(userDTO);
	}
	
}
