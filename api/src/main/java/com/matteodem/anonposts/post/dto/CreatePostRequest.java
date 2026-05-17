package com.matteodem.anonposts.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreatePostRequest {

    @NotBlank
    @Size(max = 120)
    private String title;

    @Size(max = 140)
    private String slug;

    @NotBlank
    private String content;

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getContent() {
        return content;
    }
}
