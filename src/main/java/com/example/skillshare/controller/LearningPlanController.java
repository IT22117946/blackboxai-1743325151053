package com.example.skillshare.controller;

import com.example.skillshare.model.LearningPlan;
import com.example.skillshare.service.LearningPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class LearningPlanController {
    private final LearningPlanService learningPlanService;

    @PostMapping
    public ResponseEntity<LearningPlan> createPlan(
            @RequestBody LearningPlan plan,
            Authentication authentication) {
        return ResponseEntity.ok(learningPlanService.createPlan(plan, authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPlan> getPlan(@PathVariable Long id) {
        return ResponseEntity.ok(learningPlanService.getPlanById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningPlan>> getUserPlans(@PathVariable Long userId) {
        return ResponseEntity.ok(learningPlanService.getPlansByUser(userId));
    }

    @GetMapping("/feed")
    public ResponseEntity<List<LearningPlan>> getFeedPlans(Authentication authentication) {
        return ResponseEntity.ok(learningPlanService.getFeedPlans(authentication));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningPlan> updatePlan(
            @PathVariable Long id,
            @RequestBody LearningPlan planDetails,
            Authentication authentication) {
        return ResponseEntity.ok(learningPlanService.updatePlan(id, planDetails, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(
            @PathVariable Long id,
            Authentication authentication) {
        learningPlanService.deletePlan(id, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<LearningPlan>> searchPlans(@RequestParam String query) {
        return ResponseEntity.ok(learningPlanService.searchPlans(query));
    }
}