package com.PranavRaut.Journal_Demo.service;

import com.PranavRaut.Journal_Demo.entity.JournalEntry;
import com.PranavRaut.Journal_Demo.repository.JournalEntryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryService {

    @Autowired
    private JournalEntryRepository journalEntryRepo ;

    public void saveEntry (JournalEntry journalEntry){
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

    public void deletebyId (ObjectId id){
        journalEntryRepo.deleteById(id);
    }

}

// Controller --> Service(business logic) --> Repository
