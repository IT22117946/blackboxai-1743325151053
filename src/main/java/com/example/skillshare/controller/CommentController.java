package com.example.skillshare.controller;

import com.example.skillshare.model.Comment;
import com.example.skillshare.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @RequestBody Comment comment,
            Authentication authentication) {
        return ResponseEntity.ok(commentService.createComment(comment, authentication));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id,
            @RequestBody Comment comment,
            Authentication authentication) {
        return ResponseEntity.ok(commentService.updateComment(id, comment, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id,
            Authentication authentication) {
        commentService.deleteComment(id, authentication);
        return ResponseEntity.noContent().build();
    }
}