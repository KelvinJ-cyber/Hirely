package com.project.hirely_backend.dto.application;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateApplicationRequest {

    @NotNull(message = "Job ID is required")
    private Long jobId;

    @NotBlank(message = "Resume name type is required")
    private String resumeFileName;

    @NotNull(message = "Resume data is required")
    private byte[] resumeData;

    @Size(max = 2000, message = "Cover letter cannot exceed 2000 characters")
    private String coverLetter;

}
