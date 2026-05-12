package com.project.hirely_backend.dto.company;

import com.project.hirely_backend.entities.company.JobType;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class JobListingResponse {
    private Long id;
    private String companyName;
    private String title;
    private JobType jobType;
    private String location;
    private String salaryRange;
    private LocalDateTime createdAt;
}
