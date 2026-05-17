package com.matteodem.anonposts.post;

import com.matteodem.anonposts.post.dto.CreatePostRequest;
import com.matteodem.anonposts.post.dto.UpdatePostRequest;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Locale;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post create(CreatePostRequest request) {
        String slug = request.getSlug();

        if (slug == null || slug.isBlank()) {
            slug = request.getTitle();
        }

        slug = generateUniqueSlug(slug);
        String token = generateSecretToken();

        Post post = new Post(
                request.getTitle().trim(),
                slug,
                request.getContent(),
                token
        );

        return postRepository.save(post);
    }

    public Post getBySlug(String slug) {
        return postRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Post not found"
                        )
                );
    }

    public Post update(String slug, UpdatePostRequest request, String token) {
        Post post = getBySlug(slug);
        validateToken(post, token);

        post.setTitle(request.getTitle().trim());
        post.setContent(request.getContent());

        return postRepository.save(post);
    }

    public void delete(String slug, String token) {
        Post post = getBySlug(slug);
        validateToken(post, token);

        postRepository.delete(post);
    }

    public boolean isOwner(Post post, String token) {
        return token != null && token.equals(post.getSecretToken());
    }

    private void validateToken(Post post, String token) {
        if (token == null || token.isBlank() || !token.equals(post.getSecretToken())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid secret token");
        }
    }

    private String generateSecretToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String generateUniqueSlug(String input) {
        String baseSlug = slugify(input);

        if (baseSlug.isBlank()) {
            baseSlug = "post";
        }

        String slug = baseSlug;
        int counter = 2;

        while (postRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }

        return slug;
    }

    private String slugify(String input) {
        return input
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }
}
