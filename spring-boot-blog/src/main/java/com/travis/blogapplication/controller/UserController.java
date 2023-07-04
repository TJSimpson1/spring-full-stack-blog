package com.travis.blogapplication.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.travis.blogapplication.model.User;
import com.travis.blogapplication.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getUsers() {
		return userService.getAllUsers();
	}

	@GetMapping
	public ResponseEntity<Optional<User>> getUserById(@PathVariable("id") int id) {
		Optional<User> user = userService.getUserById(id);
		if (user.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(user);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User createdUser = userService.createUser(user);

		if (createdUser != null) {
			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{UserId}")
					.buildAndExpand(createdUser.getId()).toUri();
			return ResponseEntity.created(location).build();
		}
		return ResponseEntity.status(HttpStatus.CONFLICT).build();
	}
	
	@DeleteMapping
	public ResponseEntity<Void> deleteUser(@PathVariable int id) {
		if(userService.deleteUser(id)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		if(userService.updateUser(user)) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
}
