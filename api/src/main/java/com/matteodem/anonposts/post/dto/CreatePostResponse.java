package com.matteodem.anonposts.post.dto;

import com.matteodem.anonposts.post.Post;

public class CreatePostResponse {

    private String title;
    private String slug;
    private String content;
    private String secretToken;

    public CreatePostResponse(Post post) {
        this.title = post.getTitle();
        this.slug = post.getSlug();
        this.content = post.getContent();
        this.secretToken = post.getSecretToken();
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

    public String getSecretToken() {
        return secretToken;
    }
}
