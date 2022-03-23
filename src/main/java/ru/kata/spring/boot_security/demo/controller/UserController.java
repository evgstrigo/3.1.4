package ru.kata.spring.boot_security.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

@Controller
public class UserController {

    @GetMapping("/login")
    public String goToLoginPage() {
        return "login";
    }



    // в этом методе мы будем передавать на страничку /user сразу все данные залогиненного юзера
    // иначе были проблемы с доступом к admin/username/ у пользователя без роли  ADMIN
    @GetMapping (value = "/username")
    @ResponseBody
    public String currentUserName(@AuthenticationPrincipal User user) throws JsonProcessingException {
        System.out.println("Сработал currentUserName");
        System.out.println(user.getUsername());
        System.out.println(user.getRoles());
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode userJSON = mapper.createObjectNode();
        userJSON.put("id", user.getId());
        userJSON.put("name", user.getName());
        userJSON.put("lastName", user.getLastName());
        userJSON.put("email", user.getEmail());
        userJSON.put("age", user.getAge());
        userJSON.put("username", user.getUsername());
        StringBuilder rolesString = new StringBuilder();
        for(Role role : user.getRoles()) {
            rolesString.append(role.getValue());
            rolesString.append(" ");
        }
        userJSON.put("roles", rolesString.toString().trim());
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(userJSON);
    }
}



