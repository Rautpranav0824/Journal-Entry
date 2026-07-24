package com.PranavRaut.Journal_Demo.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Data // ye lombok ka annotation hai , basically ye khud getters , setters , etc generate kr deta hai compile time ke vakt
@Document(collection = "journal_entries")
@JsonPropertyOrder({"id", "title", "content"})
public class JournalEntry {

    @Id
    private ObjectId id ;

    private String title ;

    private String content ;

    private LocalDateTime date;

//   public LocalDateTime getDate() {
//        return date;
//    }
//
//    public void setDate(LocalDateTime date) {
//        this.date = date;
//    }
//
//    public ObjectId getId() {
//        return id;
//    }
//
//    public void setId(ObjectId id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public void setContent(String content) {
//        this.content = content;
//    }
}
