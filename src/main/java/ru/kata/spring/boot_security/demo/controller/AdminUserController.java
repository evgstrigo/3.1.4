package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
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

    @GetMapping("/")
    public String findAll(Model model) {
        List<User> myList = userService.findAll();
        model.addAttribute("users", myList);
        return "user-list";
    }

    @GetMapping("/new")
    public String addUser(Model model) {
        User user = new User();
        model.addAttribute("userToAdd", user);
        List<Role> roles = userService.findAllRoles();
        model.addAttribute("selectableRoles", roles);
        return "user-info-new";
    }

    @PostMapping("/")
    public String addUserAndShowAll(@ModelAttribute(name = "userToAdd") User user,
                                    @ModelAttribute(name = "roles") List<Role> roles) {
        user.getRoles().addAll(roles);
        userService.saveUser(user);
        return "redirect:/admin/";
    }


    @GetMapping("/{id}/edit")
    public String editUser(@PathVariable("id") long id, Model model) {
        model.addAttribute("userToEdit", userService.findById(id));
        List<Role> roles = userService.findAllRoles();
        model.addAttribute("selectableRoles", roles);
        return "user-info-edit";
    }

    @PatchMapping("/{id}")
    public String saveEditedUser(@ModelAttribute("userToEdit") User user) {
        userService.saveUser(user);
        return "redirect:/admin/";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return "redirect:/admin/";
    }


}

