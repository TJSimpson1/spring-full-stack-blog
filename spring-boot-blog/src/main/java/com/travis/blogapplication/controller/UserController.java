package com.travis.blogapplication.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.UserDAO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserDAO userRepository;
	
	@GetMapping("/{username}/role")
	public ResponseEntity<String> getUserRole(@PathVariable String username){
		Optional<User> user = userRepository.findFirstByUsername(username);
		if(user.isPresent()) {
			String role = user.get().getRole().name();
			return ResponseEntity.ok(role);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
}
