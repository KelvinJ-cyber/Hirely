package com.project.hirely_backend.controller;

import com.project.hirely_backend.dto.company.CreateJobRequest;
import com.project.hirely_backend.dto.company.CreateProfileRequest;
import com.project.hirely_backend.dto.company.JobPostingResponse;
import com.project.hirely_backend.dto.company.UpdateJobRequest;
import com.project.hirely_backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping("create-profile/{userId}")
    public void createCompanyProfile(@PathVariable Long userId, @RequestBody CreateProfileRequest request) {
        companyService.createCompanyProfile(userId, request);
    }

    @PostMapping("/create-job/{companyId}")
    public ResponseEntity<JobPostingResponse> createJobPosting(@PathVariable Long companyId, @RequestBody CreateJobRequest request) {
        JobPostingResponse response = companyService.createJob(request, companyId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{jobId}/{companyId}")
    public ResponseEntity<JobPostingResponse> updateJob(
            @PathVariable Long jobId,
            @PathVariable Long companyId,
            @RequestBody UpdateJobRequest request
    ) {
        return ResponseEntity.ok(companyService.updateJob(jobId, request, companyId));
    }

    @DeleteMapping("/{jobId}/{companyId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId, @PathVariable Long companyId) {
        companyService.deleteJob(jobId, companyId);
        return ResponseEntity.noContent().build();
    }




}
