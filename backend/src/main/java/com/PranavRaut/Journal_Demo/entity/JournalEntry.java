package com.PranavRaut.Journal_Demo.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data // ye lombok ka annotation hai , basically ye khud getters , setters , etc generate kr deta hai compile time ke vakt
@Document(collection = "journal_entries")
@JsonPropertyOrder({"id", "title", "content", "date", "mood", "summary", "tags"})
public class JournalEntry {

    @Id
    private ObjectId id ;

    @NonNull
    private String title ;

    private String content ;

    private LocalDateTime date;

    private String mood;

    private String summary;

    private List<String> tags;

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
