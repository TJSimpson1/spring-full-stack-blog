package com.travis.blogapplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travis.blogapplication.dto.AuthenticationResponse;
import com.travis.blogapplication.dto.SignupRequest;
import com.travis.blogapplication.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class SignupUserController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> createUser(@RequestBody SignupRequest signupRequest) {
//		UserDTO createdUser = authService.createUser(signupRequest);
//		if(createdUser == null) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//		}
		try {
			return ResponseEntity.ok(authService.createUser(signupRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
		
	}
	
	@PostMapping("/register/author")
	public ResponseEntity<AuthenticationResponse> createAuthor(@RequestBody SignupRequest signupRequest){
		try {
			return ResponseEntity.ok(authService.createAuthor(signupRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

}
