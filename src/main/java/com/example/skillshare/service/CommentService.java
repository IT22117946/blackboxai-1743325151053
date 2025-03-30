package com.example.skillshare.service;

import com.example.skillshare.model.Comment;
import com.example.skillshare.model.Post;
import com.example.skillshare.model.User;
import com.example.skillshare.repository.CommentRepository;
import com.example.skillshare.repository.PostRepository;
import com.example.skillshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public Comment createComment(Comment comment, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(comment.getPost().getId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        comment.setUser(user);
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findCommentsByPostIdOrderByCreatedAtDesc(postId);
    }

    public Comment updateComment(Long id, Comment commentDetails, Authentication authentication) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        if (!comment.getUser().getEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized to update this comment");
        }

        comment.setContent(commentDetails.getContent());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id, Authentication authentication) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        if (!comment.getUser().getEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized to delete this comment");
        }

        commentRepository.delete(comment);
    }
}