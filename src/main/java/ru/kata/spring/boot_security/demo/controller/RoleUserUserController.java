package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;


@RestController
@RequestMapping("/user")
public class UserUserController {
    private final UserService userService;

    @Autowired
    public UserUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) {
        return userService.findById(id);
    }
//    public String showUserInfoById(Model model, @AuthenticationPrincipal User user) {
//        model.addAttribute("currentUser", user);
//        model.addAttribute("currentUserRoles", user.getRoles());
//        return "user";
//    }


}
