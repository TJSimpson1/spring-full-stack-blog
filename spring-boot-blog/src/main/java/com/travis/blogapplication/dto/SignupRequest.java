package com.travis.blogapplication.dto;

import com.travis.blogapplication.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

	private String name;

	private String username;

	private String password;

	private String email;
	
	private Role role;

}
