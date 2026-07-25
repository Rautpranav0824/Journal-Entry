package com.PranavRaut.Journal_Demo.controller;
import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getallusers(){
        return userService.getAll();
    }

    @PostMapping
    public void createuser (@RequestBody User user){
        userService.saveEntry(user);
    }




}