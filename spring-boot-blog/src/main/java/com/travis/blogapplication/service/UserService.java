package com.travis.blogapplication.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.dto.UserDTO;
import com.travis.blogapplication.model.Author;
import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.AuthorRepository;
import com.travis.blogapplication.repository.UserDAO;

@Service
public class UserService {

	@Autowired
	private UserDAO userRepository;
	
	@Autowired
	private AuthorRepository authorRepository;
	
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

	public Optional<UserDTO> getAuthorByUsername(String username) {
	    Optional<Author> author = authorRepository.findFirstByUsername(username);
	    
	    if (author.isPresent()) {
	        UserDTO authorDTO = new UserDTO();
	        Author authorEntity = author.get();
	        authorDTO.setId(authorEntity.getId());
	        authorDTO.setName(authorEntity.getName());
	        authorDTO.setUsername(authorEntity.getUsername());
	        authorDTO.setEmail(authorEntity.getEmail());
	        authorDTO.setRole(authorEntity.getRole());
	        // Map other fields
	        
	        return Optional.of(authorDTO);
	    }
	    
	    return Optional.empty();
	}

}
