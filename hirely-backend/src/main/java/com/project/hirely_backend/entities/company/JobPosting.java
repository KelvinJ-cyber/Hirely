package com.project.hirely_backend.entities.company;


import com.project.hirely_backend.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "job_postings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private User company;

    private String title;

    private String department;

    private String roleOverview;

    private String requirementsAndQualifications;

    @Enumerated(EnumType.STRING)
    private JobType jobType;

    private String location;

    private String salaryRange;

    @ElementCollection
    private List<String> techStack;

    private Boolean isActive = true;

    private int numberOfApplicants = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;



}
