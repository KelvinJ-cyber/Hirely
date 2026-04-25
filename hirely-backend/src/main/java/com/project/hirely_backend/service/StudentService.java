package com.project.hirely_backend.service;

import com.project.hirely_backend.dto.user.CreateProfileRequest;
import com.project.hirely_backend.dto.user.EducationDTO;
import com.project.hirely_backend.dto.user.ExperienceDTO;
import com.project.hirely_backend.dto.user.UserProfileResponse;
import com.project.hirely_backend.entities.Roles;
import com.project.hirely_backend.entities.User;
import com.project.hirely_backend.entities.student.Education;
import com.project.hirely_backend.entities.student.Experience;
import com.project.hirely_backend.entities.student.StudentProfileDetails;
import com.project.hirely_backend.repo.StudentProfileRepo;
import com.project.hirely_backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepo userRepo;
    private final StudentProfileRepo studentProfileRepo;

    public void createProfile(Long userId, CreateProfileRequest dto) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if (user.getRoles() != Roles.STUDENT){
            throw new RuntimeException("Only Student can have profile");
        }
        if (user.getProfileDetails() != null) {
            throw new RuntimeException("Profile already exists");
        }

        StudentProfileDetails profile = StudentProfileDetails.builder()
                .aboutMe(dto.aboutMe)
                .bio(dto.getBio())
                .skillSet(dto.getSkillSets())
                .user(user)
                .build();

        user.setProfileDetails(profile);
        userRepo.save(user);
    }

    public void addEducation(Long userId, EducationDTO dto){

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Education edu = new Education();
        edu.setTitle(dto.getTitle());
        edu.setDescription(dto.getDescription());
        edu.setTimeline(dto.getTimeline());
        edu.setNameOfInstitute(dto.getNameOfInstitute());

        profile.addEducation(edu);

    }

    public void addExperience(Long userId, ExperienceDTO dto){

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Experience exp = new Experience();
        exp.setTitle(dto.getTitle());
        exp.setDescription(dto.getDescription());
        exp.setTimeline(dto.getTimeline());
        exp.setNameOfInstitute(dto.getNameOfInstitute());

        profile.addExperience(exp);

    }



    // Helper: Map User to UserProfileResponse
    private UserProfileResponse mapToProfileResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .educationList(user.getProfileDetails().getEducationList())
                .experienceList(user.getProfileDetails().getExperienceList())
                .aboutMe(user.getProfileDetails().getAboutMe())
                .bio(user.getProfileDetails().getBio())
                .skillSet(user.getProfileDetails().getSkillSet())
                .build();
    }

    // Get currently logged-in user
    public UserProfileResponse getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToProfileResponse(user);
    }
    // Admin: Get all users by role
    public List<UserProfileResponse> getUsersByRole(Roles roles) {
        return userRepo.findByRoles(roles).stream()
                .map(this::mapToProfileResponse)
                .collect(Collectors.toList());
    }

    // Admin: Approve company
    public UserProfileResponse approveCompany(Long companyId) {
        User company = userRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if (company.getRoles() != Roles.COMPANY) {
            throw new RuntimeException("User is not a company");
        }

        company.setIsApproved(true);
        userRepo.save(company);
        return mapToProfileResponse(company);
    }


    // Admin: Suspend/Activate user
    public UserProfileResponse toggleUserStatus(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsActive(!user.getIsActive());
        userRepo.save(user);
        return mapToProfileResponse(user);
    }

}
