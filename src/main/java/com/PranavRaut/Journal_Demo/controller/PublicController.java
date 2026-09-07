package com.PranavRaut.Journal_Demo.controller;

import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.service.CustomUserDetailService;
import com.PranavRaut.Journal_Demo.service.UserService;
import com.PranavRaut.Journal_Demo.utils.JWTutil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@Slf4j
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private JWTutil jwTutil;


    @GetMapping("/health-check")
    public String healthCheck(){
        return "All Good";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createuser (@RequestBody User user){
        try {

            userService.saveNewUser(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginuser (@RequestBody User user){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName() , user.getPassword()));
            UserDetails userDetails = customUserDetailService.loadUserByUsername(user.getUserName());
            String jwt = jwTutil.generateToken(userDetails.getUsername());
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        }
        catch (Exception e) {
            log.error("Exception occurred while createAuthToken ");
            return new ResponseEntity<>("Incorrect Username or Password",HttpStatus.BAD_REQUEST);
        }

    }
}
