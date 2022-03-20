package ru.kata.spring.boot_security.demo.service;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import ru.kata.spring.boot_security.demo.model.User;

import java.io.IOException;

public class UserSerializer extends StdSerializer<User> {
    protected UserSerializer(Class<User> t) {
        super(t);
    }

    @Override
    public void serialize(User user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {

    }
}
