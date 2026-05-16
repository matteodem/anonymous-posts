package com.matteodem.anonposts.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
public class ExampleController {

    private final ExampleRepository exampleRepository;

    public ExampleController(ExampleRepository exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    @GetMapping("/api/example-create")
    public ExampleEntity createExample() {
        String uniqueId = UUID.randomUUID().toString();

        ExampleEntity entity = new ExampleEntity(
                "Hello from SQLite (ID: " + uniqueId + ")",
                LocalDateTime.now()
        );

        return exampleRepository.save(entity);
    }

    @GetMapping("/api/example-get")
    public List<ExampleEntity> getExamples() {
        return exampleRepository.findAll();
    }
}