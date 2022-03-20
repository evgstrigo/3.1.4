package ru.kata.spring.boot_security.demo.model;


import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")

@Setter
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    public int getId() {
        return id;
    }


    public String getValue() {
        return value;
    }

    @Column(name = "role_name")
    private String value;

    public Role() {
    }

    @ManyToMany(mappedBy = "roles")
    private List<User> users;


    @Override
    public String getAuthority() {
        return this.value;
    }


    @Override
    public String toString() {
        return this.value;
    }


}

