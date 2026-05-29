package com.project.hirely_backend.dto.company;

import com.project.hirely_backend.entities.company.JobType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CompanyJobCardResponse {
    private Long id;
    private String title;
    private String location;
    private JobType jobType;
    private Boolean isActive;
    private int totalApplicants;
    private LocalDateTime postedAt;
}
