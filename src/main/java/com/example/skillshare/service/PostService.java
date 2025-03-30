package com.example.skillshare.service;

import com.example.skillshare.model.Post;
import com.example.skillshare.model.User;
import com.example.skillshare.repository.PostRepository;
import com.example.skillshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public Post createPost(String description, List<MultipartFile> mediaFiles, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setDescription(description);
        post.setUser(user);

        if (mediaFiles != null && !mediaFiles.isEmpty()) {
            List<String> mediaUrls = mediaFiles.stream()
                    .map(file -> fileStorageService.storeFile(file))
                    .toList();
            post.setMediaUrls(mediaUrls);
        }

        return postRepository.save(post);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getFeedPosts(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return postRepository.findByUserIds(user.getFollowing().stream()
                .map(User::getId)
                .toList());
    }

    public void deletePost(Long id, Authentication authentication) {
        Post post = getPostById(id);
        if (!post.getUser().getEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized to delete this post");
        }
        postRepository.delete(post);
    }

    public void likePost(Long id) {
        Post post = getPostById(id);
        post.setLikeCount(post.getLikeCount() + 1);
        postRepository.save(post);
    }
}