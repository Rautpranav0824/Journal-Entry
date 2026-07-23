package com.PranavRaut.Journal_Demo.controller;

import com.PranavRaut.Journal_Demo.entity.JournalEntry;
import com.PranavRaut.Journal_Demo.service.JournalEntryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/journal")
public class JournalEntryControllerV2 {

    @Autowired
    private JournalEntryService journalEntryService;


    @GetMapping   // ab isme hamne kuch pass nhi kiya soo localhost:8080/journal GET hoga toh yha aayega
    public List<JournalEntry> getall (){
        return journalEntryService.getAll();
    }

    @PostMapping // localhost:8080/journal POST hoga toh yha aayega
    public JournalEntry createEntry (@RequestBody JournalEntry myEntry){
        myEntry.setDate(LocalDateTime.now());
        journalEntryService.saveEntry(myEntry);
        return myEntry;
    }

    @GetMapping("/id/{myId}")
    public JournalEntry getjournalentry (@PathVariable("myId") ObjectId myId){
        return journalEntryService.findbyId(myId).orElse(null);
    }

    @DeleteMapping("/id/{myId}")
    public String deletejournalentry (@PathVariable("myId") ObjectId myId){
        journalEntryService.deletebyId(myId);
        return "The entry has been removed";
    }

    @PutMapping("/id/{myId}")
    public String editjournalentry (@PathVariable("myId") Long myId , @RequestBody JournalEntry myEntry){

        return "The changes are made in ID : "+ myId +" Successfully";
    }


    // this endpoind check database is connected or not
    @Autowired
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    @GetMapping("/dbcheck")
    public String dbCheck() {
        return "Connected to DB: " + mongoTemplate.getDb().getName();
    }
}
