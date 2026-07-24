package com.PranavRaut.Journal_Demo.controller;

import com.PranavRaut.Journal_Demo.entity.JournalEntry;
import com.PranavRaut.Journal_Demo.service.JournalEntryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

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
    public ResponseEntity<JournalEntry> createEntry (@RequestBody JournalEntry myEntry){
        try {
            myEntry.setDate(LocalDateTime.now());
            journalEntryService.saveEntry(myEntry);
            return new  ResponseEntity<>(myEntry , HttpStatus.CREATED);
        }catch (Exception e){
            return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/id/{myId}")
    public ResponseEntity<?> getjournalentry (@PathVariable("myId") ObjectId myId){
        Optional<JournalEntry> journalentry = journalEntryService.findbyId(myId);
        if(journalentry.isPresent()){
            return new ResponseEntity<>(journalentry.get(), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/id/{myId}")
    public ResponseEntity<?> deletejournalentry (@PathVariable("myId") ObjectId myId){
        journalEntryService.deletebyId(myId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


        // put is remaning to have changes
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
