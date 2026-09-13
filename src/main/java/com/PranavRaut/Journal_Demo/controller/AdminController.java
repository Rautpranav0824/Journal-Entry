package com.PranavRaut.Journal_Demo.controller;

import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")

public class AdminController {

    @Autowired
    public  UserService userService;

    @GetMapping("/get-users")
    public ResponseEntity<List<User>> getAll(){
        List<User> users = userService.getAll();
        if(users != null && !users.isEmpty()){
            return new ResponseEntity<>(users, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public void addAdmin(@RequestBody User user){
        userService.saveAdmin(user);
    }
}
