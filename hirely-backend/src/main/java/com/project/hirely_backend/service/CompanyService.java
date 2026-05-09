package com.project.hirely_backend.service;

import com.project.hirely_backend.dto.company.CreateJobRequest;
import com.project.hirely_backend.dto.company.CreateProfileRequest;
import com.project.hirely_backend.dto.company.JobPostingResponse;
import com.project.hirely_backend.dto.company.UpdateJobRequest;
import com.project.hirely_backend.entities.Roles;
import com.project.hirely_backend.entities.User;
import com.project.hirely_backend.entities.company.CompanyProfileDetails;
import com.project.hirely_backend.entities.company.JobPosting;
import com.project.hirely_backend.repo.JobPostingRepo;
import com.project.hirely_backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final JobPostingRepo jobPostingRepo;
    private final UserRepo userRepo;

    public JobPostingResponse createJob(CreateJobRequest request, Long Id ) {

        User company = userRepo.findById(Id).
                orElseThrow(() -> new RuntimeException("Company not found!"));

        if(company.getRoles() != Roles.COMPANY){
            throw new RuntimeException("Only company can create job posting");
        }

        if(!company.getIsApproved()) {
            throw new RuntimeException("Company account is not approved yet");
        }

        JobPosting jobPosting =JobPosting.builder()
                .company(company)
                .title(request.getTitle())
                .department(request.getDepartment())
                .roleOverview(request.getRoleOverview())
                .requirementsAndQualifications(request.getRequirementsAndQualifications())
                .techStack(request.getTechStack())
                .jobType(request.getJobType())
                .location(request.getLocation())
                .salaryRange(request.getSalaryRange())
                .isActive(true)
                .build();
        jobPostingRepo.save(jobPosting);

        return mapToResponse(jobPosting);
    }

    // COMPANY: Delete a job posting
    public void deleteJob(Long jobId, Long companyId) {
        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        JobPosting job = jobPostingRepo.findByIdAndCompanyId(jobId, company.getId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        jobPostingRepo.delete(job);
    }

    // COMPANY: Update a job posting
    public JobPostingResponse updateJob(Long jobId, UpdateJobRequest request, Long companyId) {
        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        JobPosting job = jobPostingRepo.findByIdAndCompanyId(jobId, company.getId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setTitle(request.getTitle());
        job.setJobType(request.getJobType());
        job.setDepartment(request.getDepartment());
        job.setRoleOverview(request.getRoleOverview());
        job.setRequirementsAndQualifications(request.getRequirementsAndQualifications());
        job.setTechStack(request.getTechStack());
        job.setLocation(request.getLocation());
        job.setSalaryRange(request.getSalaryRange());

        jobPostingRepo.save(job);
        return mapToResponse(job);


    }

        // Helper: Map to full response
    private JobPostingResponse mapToResponse(JobPosting job) {
        return JobPostingResponse.builder()
                .id(job.getId())
                .companyId(job.getCompany().getId())
                .companyName(job.getCompany().getCompanyDetails().getLegalName())
                .title(job.getTitle())
                .department(job.getDepartment())
                .roleOverview(job.getRoleOverview())
                .requirementsAndQualifications(job.getRequirementsAndQualifications())
                .techStack(job.getTechStack())
                .jobType(job.getJobType())
                .location(job.getLocation())
                .salaryRange(job.getSalaryRange())
                .isActive(job.getIsActive())
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .build();
    }

    public void createCompanyProfile(Long companyId, CreateProfileRequest request) {

        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found!"));

        if (company.getRoles() != Roles.COMPANY){
            throw new RuntimeException("Only Student can have profile");
        }
        if (company.getProfileDetails() != null) {
            throw new RuntimeException("Profile already exists");
        }

        CompanyProfileDetails profileDetails = CompanyProfileDetails.builder()
                .user(company)
                .legalName(request.getLegalName())
                .website(request.getWebsite())
                .aboutCompany(request.getAboutCompany())
                .tagline(request.getTagline())
                .missionStatement(request.getMissionStatement())
                .coreValues(request.getCoreValues())
                .headquarters(request.getHeadquarters())
                .primaryIndustry(request.getPrimaryIndustry())
                .build();
        company.setCompanyDetails(profileDetails);
        userRepo.save(company);
    }
}

