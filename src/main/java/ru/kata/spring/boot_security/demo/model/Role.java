package ru.kata.spring.boot_security.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")

@Getter
@Setter
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "role_name")
    private String value;

    public Role() {
    }

    @ManyToMany(mappedBy ="roles" )
    private Set<User> users;


    @Override
    public String getAuthority() {
        return this.value;
    }


    @Override
    public String toString() {
        return this.value;
    }

}

