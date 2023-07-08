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
				.requestMatchers("/api/register", "/api/auth/login").permitAll().anyRequest().authenticated())
//				.authorizeHttpRequests()
//				.requestMatchers("/register", "/authentication").permitAll()
//				.and()
//				.authorizeHttpRequests().requestMatchers("/api/**")
//				.authenticated().and()
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
