package com.travis.blogapplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static com.travis.blogapplication.model.Permission.ADMIN_CREATE;
import static com.travis.blogapplication.model.Permission.ADMIN_DELETE;
import static com.travis.blogapplication.model.Permission.ADMIN_READ;
import static com.travis.blogapplication.model.Permission.ADMIN_UPDATE;
import static com.travis.blogapplication.model.Permission.MANAGER_CREATE;
import static com.travis.blogapplication.model.Permission.MANAGER_DELETE;
import static com.travis.blogapplication.model.Permission.MANAGER_READ;
import static com.travis.blogapplication.model.Permission.MANAGER_UPDATE;
import static com.travis.blogapplication.model.Role.ADMIN;
import static com.travis.blogapplication.model.Role.MANAGER;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.http.HttpMethod.DELETE;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> auth
//						.requestMatchers("/api/**").
				.requestMatchers("/api/auth/**").permitAll()
				.requestMatchers("/api/management/**").hasAnyRole(ADMIN.name(), MANAGER.name())
		        .requestMatchers(GET, "/api/management/**").hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name())
		        .requestMatchers(POST, "/api/management/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name())
		        .requestMatchers(PUT, "/api/management/**").hasAnyAuthority(ADMIN_UPDATE.name(), MANAGER_UPDATE.name())
		        .requestMatchers(DELETE, "/api/management/**").hasAnyAuthority(ADMIN_DELETE.name(), MANAGER_DELETE.name())
		        .requestMatchers(GET, "/api/admin/**").hasAuthority(ADMIN_READ.name())
		        .requestMatchers(POST, "/api/admin/**").hasAuthority(ADMIN_CREATE.name())
		        .requestMatchers(PUT, "/api/admin/**").hasAuthority(ADMIN_UPDATE.name())
		        .requestMatchers(DELETE, "/api/admin/**").hasAuthority(ADMIN_DELETE.name())
				.anyRequest().authenticated())
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
