package com.matteodem.anonposts.post.dto;

import com.matteodem.anonposts.post.Post;

import java.time.LocalDateTime;

public class PostResponse {

    private Long id;
    private String title;
    private String slug;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean owner;

    public PostResponse(Post post, boolean owner) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.slug = post.getSlug();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public boolean isOwner() {
        return owner;
    }
}