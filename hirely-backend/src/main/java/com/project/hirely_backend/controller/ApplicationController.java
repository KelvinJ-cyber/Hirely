package com.project.hirely_backend.controller;

import com.project.hirely_backend.dto.application.ApplicationResponse;
import com.project.hirely_backend.dto.application.CreateApplicationRequest;
import com.project.hirely_backend.dto.application.StudentApplicationResponse;
import com.project.hirely_backend.entities.Application;
import com.project.hirely_backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    // STUDENTS ENDPOINTS

    @PostMapping("/apply/{userId}")
    public ResponseEntity<ApplicationResponse> applyToJob(@RequestBody CreateApplicationRequest request, @PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.CREATED).
                body(applicationService.applyToJob(request, userId));
    }

    @GetMapping("/my-applications/{userId}")
    public ResponseEntity<List<StudentApplicationResponse>> getMyApplications(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getMyApplications(userId));
    }

    @GetMapping("/my-applications/{applicationId}/{userId}")
    public ResponseEntity<ApplicationResponse> getMyApplicationById(@PathVariable Long applicationId, @PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getMyApplicationById(applicationId, userId));
    }


}