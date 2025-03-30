package com.example.skillshare.repository;

import com.example.skillshare.model.LearningPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPlanRepository extends JpaRepository<LearningPlan, Long> {
    List<LearningPlan> findByUserId(Long userId);
    
    @Query("SELECT lp FROM LearningPlan lp WHERE lp.user.id IN :userIds ORDER BY (SELECT MAX(t) FROM lp.timeline t) DESC")
    List<LearningPlan> findByUserIdsOrderByLatestTargetDate(@Param("userIds") List<Long> userIds);
    
    @Query("SELECT lp FROM LearningPlan lp WHERE lp.title LIKE %:query% OR lp.description LIKE %:query%")
    List<LearningPlan> searchByTitleOrDescription(@Param("query") String query);
}