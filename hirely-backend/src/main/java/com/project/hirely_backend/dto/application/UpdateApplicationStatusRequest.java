package com.project.hirely_backend.dto.application;

import com.project.hirely_backend.entities.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

@Data
public class UpdateApplicationStatusRequest {


    @NotNull(message = "Status is required")
    private ApplicationStatus status;
}
