package com.example.skillshare.service;

import com.example.skillshare.model.LearningPlan;
import com.example.skillshare.model.User;
import com.example.skillshare.repository.LearningPlanRepository;
import com.example.skillshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningPlanService {
    private final LearningPlanRepository learningPlanRepository;
    private final UserRepository userRepository;

    public LearningPlan createPlan(LearningPlan plan, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        plan.setUser(user);
        return learningPlanRepository.save(plan);
    }

    public LearningPlan getPlanById(Long id) {
        return learningPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    public List<LearningPlan> getPlansByUser(Long userId) {
        return learningPlanRepository.findByUserId(userId);
    }

    public List<LearningPlan> getFeedPlans(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return learningPlanRepository.findByUserIdsOrderByLatestTargetDate(
                user.getFollowing().stream()
                        .map(User::getId)
                        .toList()
        );
    }

    public LearningPlan updatePlan(Long id, LearningPlan planDetails, Authentication authentication) {
        LearningPlan plan = getPlanById(id);
        if (!plan.getUser().getEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized to update this plan");
        }

        plan.setTitle(planDetails.getTitle());
        plan.setDescription(planDetails.getDescription());
        plan.setResources(planDetails.getResources());
        plan.setTimeline(planDetails.getTimeline());
        
        return learningPlanRepository.save(plan);
    }

    public void deletePlan(Long id, Authentication authentication) {
        LearningPlan plan = getPlanById(id);
        if (!plan.getUser().getEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized to delete this plan");
        }
        learningPlanRepository.delete(plan);
    }

    public List<LearningPlan> searchPlans(String query) {
        return learningPlanRepository.searchByTitleOrDescription(query);
    }
}