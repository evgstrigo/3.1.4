package ru.kata.spring.boot_security.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/admin")
public class RoleAdminUserController {

    private final UserService userService;

    @Autowired
    PasswordEncoder myPasswordEncoder;

    public RoleAdminUserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") long id) {
        return userService.findById(id);
    }

    @PostMapping(value = "/users", consumes = {"application/json"})
    public User addNewUser(@RequestBody User user) {

        // обработка сырого пароля
        String rawPassword = user.getPassword();
        user.setPasswd(myPasswordEncoder.encode(rawPassword));

        userService.saveUser(user);
        System.out.println("User with id = " + user.getId() + " has been added.");
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {

        // обработка сырого пароля
        String rawPassword = user.getPassword();
        System.out.println("rawPassword = " + rawPassword);
        if (rawPassword.equals("")) {
            System.out.println("При редактировании пользователя пароль не менялся");
            String oldPassword = userService.findById(user.getId()).getPassword();
            user.setPasswd(oldPassword);
            System.out.println("oldPassword = " + oldPassword);
        } else {
            user.setPasswd(myPasswordEncoder.encode(rawPassword));
        }

        userService.saveUser(user);
        System.out.println("User with id = " + user.getId() + " has been updated.");
        return user;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        System.out.println("User with id = " + id + " has been deleted.");
    }


}

