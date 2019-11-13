package com.app.dao;

import java.util.List;

import com.app.model.User;

public interface UserDao {
List<User> getAllUsers();
void saveUser(User u);
}
