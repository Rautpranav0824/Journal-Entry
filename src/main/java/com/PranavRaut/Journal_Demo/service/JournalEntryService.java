package com.PranavRaut.Journal_Demo.service;

import com.PranavRaut.Journal_Demo.entity.JournalEntry;
import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.repository.JournalEntryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryService {

    @Autowired
    private JournalEntryRepository journalEntryRepo ;

    @Autowired
    private UserService userService;

    @Transactional
    public void saveEntry (JournalEntry journalEntry, String username){
        User user = userService.findByUserName(username);
        JournalEntry saved = journalEntryRepo.save(journalEntry);
        user.getJournalEntries().add(saved);
        userService.saveUser(user);
    }

    public void saveEntry (JournalEntry journalEntry ){
        journalEntryRepo.save(journalEntry);
    }

    // ab hame get ke liye banana hai :- soo get yani hame return krna padega ( kis form mai LIST form mai )

    public List<JournalEntry> getAll (){
        return journalEntryRepo.findAll();
    }

    // ab haam banayenge get jorunal entry by ID

    public Optional<JournalEntry> findbyId(ObjectId id){
        return journalEntryRepo.findById(id);
    }

    // delete by id

    @Transactional
    public boolean deletebyId (ObjectId id, String username){
        boolean removed = false;
        try {
            User user = userService.findByUserName(username);
            removed = user.getJournalEntries().removeIf(x -> x.getId().equals(id));
            if(removed){
                userService.saveUser(user);
                journalEntryRepo.deleteById(id);
            }
        } catch (Exception e) {
            throw new RuntimeException("an error occurred while deleting the entry : "+e);
        }
        return removed;
    }

}

// Controller --> Service(business logic) --> Repository
