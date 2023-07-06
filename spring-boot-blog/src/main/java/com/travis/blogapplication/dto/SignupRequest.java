package com.travis.blogapplication.dto;

import lombok.Data;

@Data
public class SignupRequest {

	private String name;

	private String username;

	private String password;

	private String email;

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

}
