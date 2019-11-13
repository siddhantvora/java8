package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.User;
import com.app.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getAllUsers() {
		System.out.println("in getAllUsers() ");
		return userService.getAllUsers();
	}
	@PostMapping("/new")
	public ResponseEntity<String> saveUser(User u) {
		System.out.println("in getAllUsers() ");
		return new ResponseEntity<String>("saved successfully", HttpStatus.CREATED);
	}

		   


}
