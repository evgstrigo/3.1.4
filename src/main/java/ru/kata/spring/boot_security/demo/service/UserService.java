package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;


import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {


    User findById(Long id);

    List<User> findAll();

    User saveUser(User user);

    void deleteUser(Long id);

    Optional<User> findByEmail(String email);

    List<Role> findAllRoles();

    Role findByValue(String value);

}
