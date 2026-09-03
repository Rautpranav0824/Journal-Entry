package com.PranavRaut.Journal_Demo.controller;

import com.PranavRaut.Journal_Demo.entity.AIAnalysis;
import com.PranavRaut.Journal_Demo.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AIController {

    private AIService aiService;

    public AIController(AIService aiService){
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    public AIAnalysis analyze(@RequestBody String content){
        return aiService.analyzeEntry(content);
    }
}
