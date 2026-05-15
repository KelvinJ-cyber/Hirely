package com.project.hirely_backend.dto.application;

import com.project.hirely_backend.entities.ApplicationStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApplicationResponse {

    private Long applicationId;
    private Long jobId;
    private String jobTitle;
    private String companyName;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String resumeFileName;
    private String coverLetter;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;

}
