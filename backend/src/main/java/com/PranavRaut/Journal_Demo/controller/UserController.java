package com.PranavRaut.Journal_Demo.controller;
import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;




@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping()
    public ResponseEntity<?> updateUser (@RequestBody User user  ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User userInDb = userService.findByUserName(userName);

        userInDb.setUserName(user.getUserName());

        // Only touch the password if the client actually sent a new one
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            userInDb.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        // saveUser() persists as-is — it does NOT touch roles, unlike saveNewUser()
        userService.saveUser(userInDb);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}