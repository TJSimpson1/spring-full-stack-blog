package com.travis.blogapplication.service;

import com.travis.blogapplication.dto.AuthenticationRequest;
import com.travis.blogapplication.dto.AuthenticationResponse;
import com.travis.blogapplication.dto.SignupRequest;

public interface AuthService {

	AuthenticationResponse createUser(SignupRequest signupRequest);
	
	AuthenticationResponse authenticate(AuthenticationRequest request);

}
