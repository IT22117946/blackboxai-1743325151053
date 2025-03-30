package com.example.skillshare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Entity
@Data
@NoArgsConstructor
public class LearningPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "plan_resources", joinColumns = @JoinColumn(name = "plan_id"))
    @MapKeyColumn(name = "resource_name")
    @Column(name = "resource_url", columnDefinition = "TEXT")
    private Map<String, String> resources;

    @ElementCollection
    @CollectionTable(name = "plan_timeline", joinColumns = @JoinColumn(name = "plan_id"))
    @MapKeyColumn(name = "milestone")
    @Column(name = "target_date")
    private Map<String, String> timeline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}