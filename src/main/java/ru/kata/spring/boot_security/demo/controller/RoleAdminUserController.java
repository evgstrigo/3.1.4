package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class RoleAdminUserController {

    private final UserService userService;

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
        userService.saveUser(user);
        System.out.println("User with id = " + user.getId() + " has been added.");
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.saveUser(user);
        System.out.println("User with id = " + user.getId() + " has been updated.");
        return user;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        System.out.println("User with id = " + id + " has been deleted.");
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

//    @PostMapping("/")
//    public String addUserAndShowAll(@ModelAttribute(name = "userToBeAdded") User userToBeAdded) {
//        PasswordEncoder encoderForDB = new BCryptPasswordEncoder(10);
//        String notEncodedPassword = userToBeAdded.getPassword();
//        userToBeAdded.setPassword(encoderForDB.encode(notEncodedPassword));
//        userService.saveUser(userToBeAdded);
//        return "redirect:/admin/";
//    }
//
//
//    @GetMapping("/findOne")
//    @ResponseBody
//    public User findOne(long id) {
//        return userService.findById(id);
//    }
//
//
//    @PatchMapping ("/update")
//    public String updateUser(User user, @RequestParam("selectedRoles") List<String> roles) {
//        for(String roleValue : roles) {
//            user.getRoles().add(userService.findByValue(roleValue));
//        }
//        PasswordEncoder encoderForDB = new BCryptPasswordEncoder(10);
//        String notEncodedPassword = user.getPassword();
//        user.setPassword(encoderForDB.encode(notEncodedPassword));
//        userService.saveUser(user);
//        return "redirect:/admin/";
//    }
//
//    @DeleteMapping("/delete")
//    public String newDeleteUser(User user) {
//        userService.deleteUser(user.getId());
//        return "redirect:/admin/";
//    }

}

