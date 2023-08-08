package com.travis.blogapplication.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travis.blogapplication.dto.UserDTO;
import com.travis.blogapplication.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{username}")
    @PreAuthorize("isAuthenticated() and (#username == authentication.principal.username or hasRole('ADMIN'))")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable("username") String username) {
        Optional<UserDTO> user = userService.findUserByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }
	
	@GetMapping("/{username}/role")
	public ResponseEntity<String> getUserRoleByUsername(@PathVariable String username){
		Optional<UserDTO> user = userService.findUserByUsername(username);
		if(user.isPresent()) {
			String role = user.get().getRole().name();
			return ResponseEntity.ok(role);
		} 
		return ResponseEntity.notFound().build();
		
	}
	
	
}
