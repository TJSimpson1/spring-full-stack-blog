package com.travis.blogapplication.dto;

import com.travis.blogapplication.model.Role;

import lombok.Data;

@Data
public class SignupRequest {

	private String name;

	private String username;

	private String password;

	private String email;
	
	private Role role;

	public SignupRequest() {
		super();
	}

	public SignupRequest(String name, String username, String password, String email, Role role) {
		super();
		this.name = name;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
	}

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
