package com.travis.blogapplication.config;

import static com.travis.blogapplication.model.Permission.ADMIN_CREATE;
import static com.travis.blogapplication.model.Permission.ADMIN_DELETE;
import static com.travis.blogapplication.model.Permission.ADMIN_READ;
import static com.travis.blogapplication.model.Permission.ADMIN_UPDATE;
import static com.travis.blogapplication.model.Permission.AUTHOR_CREATE;
import static com.travis.blogapplication.model.Permission.AUTHOR_DELETE;
import static com.travis.blogapplication.model.Permission.AUTHOR_READ;
import static com.travis.blogapplication.model.Permission.AUTHOR_UPDATE;
import static com.travis.blogapplication.model.Role.ADMIN;
import static com.travis.blogapplication.model.Role.AUTHOR;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

	private final JwtAuthenticationFilter jwtAuthFilter;

	private final AuthenticationProvider authenticationProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> auth
				.requestMatchers("/api/auth/**").permitAll()
				.requestMatchers("/api/articles/**").permitAll()
				.requestMatchers("/api/users/**").permitAll()
				.requestMatchers("/api/management/**")
				.hasAnyRole(ADMIN.name(), AUTHOR.name())
				.requestMatchers(GET, "/api/management/**")
				.hasAnyAuthority(ADMIN_READ.getPermission(), AUTHOR_READ.getPermission())
				.requestMatchers(POST, "/api/management/**")
				.hasAnyAuthority(ADMIN_CREATE.getPermission(), AUTHOR_CREATE.getPermission())
				.requestMatchers(PUT, "/api/management/**")
				.hasAnyAuthority(ADMIN_UPDATE.getPermission(), AUTHOR_UPDATE.getPermission())
				.requestMatchers(DELETE, "/api/management/**")
				.hasAnyAuthority(ADMIN_DELETE.getPermission(), AUTHOR_DELETE.getPermission())
				.requestMatchers("/api/admin/**").hasRole(ADMIN.name())
				.requestMatchers(GET, "/api/admin/**")
				.hasAuthority(ADMIN_READ.getPermission())
				.requestMatchers(POST, "/api/admin/**")
				.hasAuthority(ADMIN_CREATE.getPermission())
				.requestMatchers(PUT, "/api/admin/**")
				.hasAuthority(ADMIN_UPDATE.getPermission())
				.requestMatchers(DELETE, "/api/admin/**")
				.hasAuthority(ADMIN_DELETE.getPermission())
				.anyRequest().authenticated())
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).build();
	}

	



}
