package com.project.hirely_backend.dto.company;

import com.project.hirely_backend.entities.company.JobType;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class UpdateJobRequest {

    @NotBlank(message = "Job title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @NotBlank(message = "Job department is required")
    private String department;


    @NotBlank(message = "Job role overview is required")
    private String roleOverview;

    private String requirementsAndQualifications;

    @NotNull(message = "Job type is required")
    private JobType jobType;

    @NotBlank(message = "Location is required")
    private String location;

    private String salaryRange;

    private List<String> techStack;
}
