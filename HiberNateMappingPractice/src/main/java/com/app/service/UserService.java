package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.UserDao;
import com.app.model.User;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	public List<User> getAllUsers() {
		return userDao.getAllUsers();
	}
	public void saveUser(User u) {
		userDao.saveUser(u);
	}
}
