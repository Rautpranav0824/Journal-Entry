package com.PranavRaut.Journal_Demo.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AIAnalysis {
    private String mood;
    private String summary;
    private List<String> tags;
}
