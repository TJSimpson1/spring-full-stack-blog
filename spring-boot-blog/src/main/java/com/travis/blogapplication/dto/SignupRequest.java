package com.travis.blogapplication.dto;

import java.util.List;

import com.travis.blogapplication.model.Authority;
import com.travis.blogapplication.model.Role;

import lombok.Data;

@Data
public class SignupRequest {

	private String name;

	private String username;

	private String password;

	private String email;
	
	private Role role;

	public String getName() {
		return name;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}

	public Role getRole() {
		return role;
	}

}
