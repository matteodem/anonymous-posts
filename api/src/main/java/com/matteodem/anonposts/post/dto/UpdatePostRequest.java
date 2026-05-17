package com.matteodem.anonposts.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdatePostRequest {

    @NotBlank
    @Size(max = 120)
    private String title;

    @NotBlank
    private String content;

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }
}
