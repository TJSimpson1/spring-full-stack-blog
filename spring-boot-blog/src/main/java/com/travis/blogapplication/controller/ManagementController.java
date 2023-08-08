package com.travis.blogapplication.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/management")
@PreAuthorize("hasRole('AUTHOR')")
public class ManagementController {
	
	@GetMapping
	@PreAuthorize("hasAuthority('author:read')")
	public String get() {
		return "GET:: author controller";
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('author:create')")
	public String post() {
		return "POST:: author controller";
	}
	@PutMapping
	@PreAuthorize("hasAuthority('author:update')")
	public String put() {
		return "PUT:: author controller";
	}
	@DeleteMapping
	@PreAuthorize("hasAuthority('author:delete')")
	public String delete() {
		return "DELETE:: author controller";
	}
}