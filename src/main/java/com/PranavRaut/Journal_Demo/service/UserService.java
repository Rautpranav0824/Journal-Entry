package com.PranavRaut.Journal_Demo.service;

import com.PranavRaut.Journal_Demo.entity.JournalEntry;
import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.repository.JournalEntryRepository;
import com.PranavRaut.Journal_Demo.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserService {

    @Autowired
    private UserRepository userRepo ;

    public void saveEntry (User user){
        userRepo.save(user);
    }

    public List<User> getAll (){
        return userRepo.findAll();
    }

    public Optional<User> findbyId(ObjectId id){
        return userRepo.findById(id);
    }

    public void deletebyId (ObjectId id){
        userRepo.deleteById(id);
    }

    public User findByUserName(String userName){
        return userRepo.findByUserName(userName);
    }

}

// Controller --> Service(business logic) --> Repository
