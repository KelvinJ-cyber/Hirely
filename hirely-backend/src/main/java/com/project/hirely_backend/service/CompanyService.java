package com.project.hirely_backend.service;

import com.project.hirely_backend.dto.company.*;
import com.project.hirely_backend.entities.Roles;
import com.project.hirely_backend.entities.User;
import com.project.hirely_backend.entities.company.CompanyProfileDetails;
import com.project.hirely_backend.entities.company.JobPosting;
import com.project.hirely_backend.repo.CompanyProfileDetailsRepo;
import com.project.hirely_backend.repo.JobPostingRepo;
import com.project.hirely_backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final JobPostingRepo jobPostingRepo;
    private final UserRepo userRepo;
    private final CompanyProfileDetailsRepo detailsRepo;

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

    private CreateProfileResponse mapToResponse(CompanyProfileDetails request){
        return CreateProfileResponse.builder()
                .Id(request.getProfileId())
                .legalName(request.getLegalName())
                .website(request.getWebsite())
                .aboutCompany(request.getAboutCompany())
                .tagline(request.getTagline())
                .missionStatement(request.getMissionStatement())
                .coreValues(request.getCoreValues())
                .headquarters(request.getHeadquarters())
                .primaryIndustry(request.getPrimaryIndustry())
                .build();
    }

    public CreateProfileResponse getCompanyProfile(Long userId){

        CompanyProfileDetails companyProfile = detailsRepo.findById(userId).
                orElseThrow(() -> new RuntimeException(" Company Details not found"));

        return mapToResponse(companyProfile);

    }
    public CreateProfileResponse createCompanyProfile(Long companyId, CreateProfileRequest request) {

        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found!"));

        if (company.getRoles() != Roles.COMPANY){
            throw new RuntimeException("Only Company can have profile");
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
        return mapToResponse(profileDetails);
    }


    public List<CompanyJobCardResponse> getALlCompanyJobs(Long companyId){

        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found!"));

        return jobPostingRepo.findByCompanyId(company.getId())
                .stream()
                .map(this::mapToResponse2)
                .collect(Collectors.toList());
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

    private CompanyJobCardResponse mapToResponse2(JobPosting job) {
        return CompanyJobCardResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .location(job.getLocation())
                .jobType(job.getJobType())
                .isActive(job.getIsActive())
                .totalApplicants(job.getNumberOfApplicants())
                .postedAt(job.getCreatedAt())
                .build();

    }

}

