package com.project.hirely_backend.dto.company;
import com.project.hirely_backend.entities.company.JobType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class JobPostingResponse {
    private Long id;
    private Long companyId;
    private String companyName;
    private String title;
    private String department;
    private String roleOverview;
    private String requirementsAndQualifications;
    private List<String> techStack;
    private JobType jobType;
    private String location;
    private String salaryRange;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}