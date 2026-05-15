package com.project.hirely_backend.service;

import com.project.hirely_backend.dto.application.ApplicationResponse;
import com.project.hirely_backend.dto.application.CreateApplicationRequest;
import com.project.hirely_backend.dto.application.StudentApplicationResponse;
import com.project.hirely_backend.dto.application.UpdateApplicationStatusRequest;
import com.project.hirely_backend.dto.user.EducationDTO.ResumeDownloadResponse;
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
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    // COMPANY: Download applicant's resume
    public ResumeDownloadResponse downloadApplicantResume(Long applicationId, Long companyId) {
        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Application application = applicationRepo.findByIdAndJobCompanyId(applicationId, companyId)
                .orElseThrow(() -> new RuntimeException("Application not found or you don't have access"));

        return ResumeDownloadResponse.builder()
                .fileName(application.getFileName())
                .fileData(application.getData())
                .build();
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId, UpdateApplicationStatusRequest request, Long companyId){

        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Application application = applicationRepo.findByIdAndJobCompanyId(applicationId, companyId)
                .orElseThrow(() -> new RuntimeException("Application not found or you don't have access"));

        // Prevent moving from final states
        if (application.getStatus() == ApplicationStatus.ACCEPTED ||
                application.getStatus() == ApplicationStatus.REJECTED) {
            throw new RuntimeException("Cannot update status of an already finalized application");
        }

        application.setStatus(request.getStatus());
        applicationRepo.save(application);

        return mapToResponse(application);
    }

    public List<StudentApplicationResponse> getMyApplications(Long studentId) {
        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return applicationRepo.findByStudentId(studentId).
                stream()
                .map(this::mapToStudentResponse)
                .collect(Collectors.toList());
    }

    public ApplicationResponse getMyApplicationById(Long applicationId, Long studentId) {

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Application application = applicationRepo.findByIdAndStudentId(applicationId, studentId)
                .orElseThrow(() -> new RuntimeException("Application not found or you don't have access"));

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

    // Helper: Map to student response from application entity (lightweight)
    private StudentApplicationResponse mapToStudentResponse(Application application) {
        return StudentApplicationResponse.builder()
                .applicationId(application.getId())
                .jobId(application.getJob().getId())
                .jobTitle(application.getJob().getTitle())
                .companyName(application.getJob().getCompany().getCompanyDetails().getLegalName())
                .resumeFileName(application.getFileName())
                .status(application.getStatus())
                .appliedAt(application.getAppliedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }

}
