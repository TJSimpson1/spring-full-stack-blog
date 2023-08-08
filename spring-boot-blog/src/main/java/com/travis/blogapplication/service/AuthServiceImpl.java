package com.travis.blogapplication.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.travis.blogapplication.dto.AuthenticationRequest;
import com.travis.blogapplication.dto.AuthenticationResponse;
import com.travis.blogapplication.dto.SignupRequest;
import com.travis.blogapplication.model.Article;
import com.travis.blogapplication.model.Author;
import com.travis.blogapplication.model.Role;
import com.travis.blogapplication.model.User;
import com.travis.blogapplication.repository.UserDAO;
import com.travis.blogapplication.utils.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired UserDAO userRepository;
	
	@Autowired
	private JwtUtil jwtService;
	
	@Autowired
	AuthenticationManager authenticationManager;

	@Override
	public AuthenticationResponse createUser(SignupRequest signupRequest) {
		if (userRepository.findFirstByUsername(signupRequest.getUsername()).isPresent()) {
	        throw new IllegalArgumentException("Username already exists");
	    }
		User user = new User();
		user.setEmail(signupRequest.getEmail());
		user.setName(signupRequest.getName());
		user.setUsername(signupRequest.getUsername());
		//TODO: sign in with email or username
		user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
		user.setRole(signupRequest.getRole());
		//TODO: make role just "USER" 
		userRepository.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().jwt(jwtToken).build();
	}
	
	@Override
	public AuthenticationResponse createAuthor(SignupRequest signupRequest) {
		if (userRepository.findFirstByUsername(signupRequest.getUsername()).isPresent()) {
	        throw new IllegalArgumentException("Username already exists");
	    }
		Author author = new Author();
		author.setEmail(signupRequest.getEmail());
		author.setName(signupRequest.getName());
		author.setUsername(signupRequest.getUsername());
		//TODO: sign in with email or username
		author.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
		author.setRole(Role.MANAGER);
		author.setArticles(new ArrayList<Article>());
		userRepository.save(author);
		var jwtToken = jwtService.generateToken(author);
		return AuthenticationResponse.builder().jwt(jwtToken).build();
	}

	@Override
	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		var user = userRepository.findFirstByUsername(authenticationRequest.getUsername()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().jwt(jwtToken).build();

	}

}
