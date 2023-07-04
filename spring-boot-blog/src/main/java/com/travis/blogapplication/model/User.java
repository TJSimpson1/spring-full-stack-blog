package com.travis.blogapplication.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity(name = "users")
public class User {

	@Id
	@Column(name = "user_id")
	@SequenceGenerator(name = "USER_ID_GEN", sequenceName = "user_id_seq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_ID_GEN")
	private int id;
	@NotBlank(message = "Name must not be blank")
	@Size(min = 2, max = 50, message = "Name must be between 2-50 characters")
	private String name;
	@NotBlank(message = "Username must not be blank")
	@Size(min = 2, max = 50, message = "Username must be between 2-50 characters")
	private String username;
	@NotBlank(message = "Email must not be blank")
	@Size(min = 2, max = 50, message = "Email must be between 2-50 characters")
	private String email;
	@NotBlank(message = "Password must not be blank")
	@Size(min = 2, max = 50, message = "Password must be between 2-50 characters")
	private String password;

	public User() {
		super();
	}

	public User(int id, String name, String username, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
