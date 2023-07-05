package com.travis.blogapplication.service;

import com.travis.blogapplication.dto.UserDTO;
import com.travis.blogapplication.dto.SignupRequest;

public interface AuthService {

	UserDTO createUser(SignupRequest signupRequest);

}
