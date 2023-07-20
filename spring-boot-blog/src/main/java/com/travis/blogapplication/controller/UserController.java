package com.travis.blogapplication.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travis.blogapplication.model.User;
import com.travis.blogapplication.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{username}")
	public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if (authentication != null && authentication.isAuthenticated()) {
	        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
	        if (username.equals(userDetails.getUsername())) {
	            Optional<User> user = userService.findUserByUsername(username);
	            if (user.isPresent()) {
	                return ResponseEntity.ok(user.get());
	            }
	            return ResponseEntity.notFound().build();
	        }
	    }
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
	@GetMapping("/{username}/role")
	public ResponseEntity<String> getUserRoleByUsername(@PathVariable String username){
		Optional<User> user = userService.findUserByUsername(username);
		if(user.isPresent()) {
			String role = user.get().getRole().name();
			return ResponseEntity.ok(role);
		} 
		return ResponseEntity.notFound().build();
		
	}
	
	
}
