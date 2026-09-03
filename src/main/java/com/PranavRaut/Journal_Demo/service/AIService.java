package com.PranavRaut.Journal_Demo.service;

import com.PranavRaut.Journal_Demo.entity.AIAnalysis;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final OpenAIClient openAIClient ;
    private final ObjectMapper objectMapper;


    public AIService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.openAIClient = OpenAIOkHttpClient.fromEnv();
    }

    public AIAnalysis analyzeEntry(String content) {

        var response = openAIClient.responses().create(
                ResponseCreateParams.builder()
                        .model("openrouter/free")
                        .input("""
                            Analyze this journal entry and return ONLY valid JSON.

                            The JSON must have exactly these fields:
                            {
                              "mood": "short description of the mood",
                              "summary": "one sentence summary",
                              "tags": ["tag1", "tag2", "tag3"]
                            }

                            Journal entry:
                            """ + content)
                        .maxOutputTokens(500)
                        .build()
        );
        System.out.println("AI RESPONSE: " + response);

        String jsonResponse = response.output().stream()
                .flatMap(item -> item.message().stream())
                .flatMap(message -> message.content().stream())
                .flatMap(contentItem -> contentItem.outputText().stream())
                .map(text -> text.text())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No AI response generated"));

        try {
            return objectMapper.readValue(jsonResponse, AIAnalysis.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }
}
