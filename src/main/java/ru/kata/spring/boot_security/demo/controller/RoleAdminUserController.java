package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import java.util.List;



@Controller
@RequestMapping("/admin")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {

    }









//    @GetMapping("/")
//    public String findAll(Model model, @AuthenticationPrincipal User user) {
//        User userToBeAdded = new User();
//        List<User> myList = userService.findAll();
//        model.addAttribute("users", myList);
//        model.addAttribute("currentUser", user);
//        model.addAttribute("currentUserRoles", user.getRoles());
//        model.addAttribute("userToBeAdded", userToBeAdded);
//        model.addAttribute("selectableRoles", userService.findAllRoles());
//        return "user-list";
//    }

    @PostMapping("/")
    public String addUserAndShowAll(@ModelAttribute(name = "userToBeAdded") User userToBeAdded) {
        PasswordEncoder encoderForDB = new BCryptPasswordEncoder(10);
        String notEncodedPassword = userToBeAdded.getPassword();
        userToBeAdded.setPassword(encoderForDB.encode(notEncodedPassword));
        userService.saveUser(userToBeAdded);
        return "redirect:/admin/";
    }


    @GetMapping("/findOne")
    @ResponseBody
    public User findOne(long id) {
        return userService.findById(id);
    }


    @PatchMapping ("/update")
    public String updateUser(User user, @RequestParam("selectedRoles") List<String> roles) {
        for(String roleValue : roles) {
            user.getRoles().add(userService.findByValue(roleValue));
        }
        PasswordEncoder encoderForDB = new BCryptPasswordEncoder(10);
        String notEncodedPassword = user.getPassword();
        user.setPassword(encoderForDB.encode(notEncodedPassword));
        userService.saveUser(user);
        return "redirect:/admin/";
    }

    @DeleteMapping("/delete")
    public String newDeleteUser(User user) {
        userService.deleteUser(user.getId());
        return "redirect:/admin/";
    }

}

