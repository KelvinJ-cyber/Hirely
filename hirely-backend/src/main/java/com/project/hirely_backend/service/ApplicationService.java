package com.project.hirely_backend.service;

import com.project.hirely_backend.dto.application.ApplicationResponse;
import com.project.hirely_backend.dto.application.CreateApplicationRequest;
import com.project.hirely_backend.entities.Application;
import com.project.hirely_backend.entities.ApplicationStatus;
import com.project.hirely_backend.entities.Roles;
import com.project.hirely_backend.entities.User;
import com.project.hirely_backend.entities.company.JobPosting;
import com.project.hirely_backend.repo.ApplicationRepo;
import com.project.hirely_backend.repo.JobPostingRepo;
import com.project.hirely_backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepo applicationRepo;
    private final JobPostingRepo jobPostingRepo;
    private final UserRepo userRepo;

    @Transactional
    public ApplicationResponse applyToJob(CreateApplicationRequest request, Long userId) {

        User student = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Student not found!"));

        if(student.getRoles() != Roles.STUDENT){
            throw new RuntimeException("Only students can apply to jobs!");
        }

        // Check if job exists and is active
        JobPosting job = jobPostingRepo.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setNumberOfApplicants(job.getNumberOfApplicants() + 1);
        jobPostingRepo.save(job);

        if (!job.getIsActive()) {
            throw new RuntimeException("This job is no longer accepting applications");
        }

        Application application = Application.builder()
                .job(job)
                .student(student)
                .coverLetter(request.getCoverLetter())
                .fileName(request.getResumeFileName())
                .data(request.getResumeData())
                .status(ApplicationStatus.PENDING)
                .build();

        applicationRepo.save(application);

        return mapToResponse(application);
    }

    // Helper: Map to full response from application entity
    private ApplicationResponse mapToResponse(Application application) {
        return ApplicationResponse.builder()
                .applicationId(application.getId())
                .jobId(application.getJob().getId())
                .jobTitle(application.getJob().getTitle())
                .companyName(application.getJob().getCompany().getCompanyDetails().getLegalName())
                .studentId(application.getStudent().getId())
                .studentName(application.getStudent().getFullName())
                .studentEmail(application.getStudent().getEmail())
                .resumeFileName(application.getFileName())
                .coverLetter(application.getCoverLetter())
                .status(application.getStatus())
                .appliedAt(application.getAppliedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }

}
