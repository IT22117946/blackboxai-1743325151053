package com.example.skillshare.controller;

import com.example.skillshare.model.User;
import com.example.skillshare.repository.UserRepository;
import com.example.skillshare.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        return authService.login(credentials.get("email"), credentials.get("password"));
    }

    @GetMapping("/login-success")
    public ResponseEntity<?> oauth2LoginSuccess() {
        return authService.handleOAuth2Success();
    }

    @GetMapping("/login-failure")
    public ResponseEntity<?> oauth2LoginFailure() {
        return ResponseEntity.badRequest().body("OAuth2 login failed");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return authService.logout();
    }
}