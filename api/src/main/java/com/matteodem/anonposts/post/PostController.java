package com.matteodem.anonposts.post;

import com.matteodem.anonposts.post.dto.CreatePostRequest;
import com.matteodem.anonposts.post.dto.CreatePostResponse;
import com.matteodem.anonposts.post.dto.PostResponse;
import com.matteodem.anonposts.post.dto.UpdatePostRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public CreatePostResponse createPost(@Valid @RequestBody CreatePostRequest request) {
        Post post = postService.create(request);
        return new CreatePostResponse(post);
    }

    @GetMapping("/{slug}")
    public PostResponse getPost(
            @PathVariable String slug,
            @RequestHeader(value = "X-Post-Token", required = false) String token
    ) {
        Post post = postService.getBySlug(slug);
        boolean owner = postService.isOwner(post, token);

        return new PostResponse(post, owner);
    }

    @PutMapping("/{slug}")
    public PostResponse updatePost(
            @PathVariable String slug,
            @RequestHeader("X-Post-Token") String token,
            @Valid @RequestBody UpdatePostRequest request
    ) {
        Post post = postService.update(slug, request, token);
        return new PostResponse(post, true);
    }

    @DeleteMapping("/{slug}")
    public void deletePost(
            @PathVariable String slug,
            @RequestHeader("X-Post-Token") String token
    ) {
        postService.delete(slug, token);
    }
}
