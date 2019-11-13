package com.app.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.model.User;

@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		
		return sessionFactory.getCurrentSession().createQuery("from User").getResultList();
	}

	public void saveUser(User u) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(u);
	}

	
}
