package com.project.hirely_backend.service;

import com.project.hirely_backend.dto.user.*;
import com.project.hirely_backend.entities.Roles;
import com.project.hirely_backend.entities.User;
import com.project.hirely_backend.entities.student.Education;
import com.project.hirely_backend.entities.student.Experience;
import com.project.hirely_backend.entities.student.StudentProfileDetails;
import com.project.hirely_backend.repo.EducationRepo;
import com.project.hirely_backend.repo.ExperienceRepo;
import com.project.hirely_backend.repo.StudentProfileRepo;
import com.project.hirely_backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepo userRepo;
    private final StudentProfileRepo studentProfileRepo;
    private final EducationRepo educationRepo;
    private final ExperienceRepo experienceRepo;

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
                .user(user)
                .aboutMe(dto.aboutMe)
                .bio(dto.getBio())
                .skillSet(dto.getSkillSets())
                .user(user)
                .build();

        user.setProfileDetails(profile);
        userRepo.save(user);
    }

    // ==================== PROFILE (Bio, AboutMe, Skills) ====================

    public void updateProfile(Long userId, UpdateProfileRequest dto) {

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        if (dto.getAboutMe() != null) {
            profile.setAboutMe(dto.getAboutMe());
        }
        if (dto.getBio() != null) {
            profile.setBio(dto.getBio());
        }
        if (dto.getSkillSets() != null) {
            profile.setSkillSet(dto.getSkillSets());
        }

        studentProfileRepo.save(profile);
    }

    // ==================== EDUCATION ====================

    public void addEducation(Long userId, EducationDTO dto){

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Education edu = new Education();
        edu.setTitle(dto.getTitle());
        edu.setDescription(dto.getDescription());
        edu.setTimeline(dto.getTimeline());
        edu.setNameOfInstitute(dto.getNameOfInstitute());

        profile.addEducation(edu);
        studentProfileRepo.save(profile);

    }

    public void updateEducation(Long userId, Long educationId, EducationDTO dto) {

        // Verify profile exists for this user
        studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Education edu = educationRepo.findById(educationId)
                .orElseThrow(() -> new RuntimeException("Education not found!"));

        // Verify this education belongs to the user's profile
        if (!edu.getProfileDetails().getProfileId().equals(userId)) {
            throw new RuntimeException("Education does not belong to this user!");
        }

        edu.setTitle(dto.getTitle());
        edu.setDescription(dto.getDescription());
        edu.setTimeline(dto.getTimeline());
        edu.setNameOfInstitute(dto.getNameOfInstitute());

        educationRepo.save(edu);
    }

    public void deleteEducation(Long userId, Long educationId) {

        studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Education edu = educationRepo.findById(educationId)
                .orElseThrow(() -> new RuntimeException("Education not found!"));

        if (!edu.getProfileDetails().getProfileId().equals(userId)) {
            throw new RuntimeException("Education does not belong to this user!");
        }

        educationRepo.delete(edu);
    }

    // ==================== EXPERIENCE ====================

    public void addExperience(Long userId, ExperienceDTO dto){

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Experience exp = new Experience();
        exp.setTitle(dto.getTitle());
        exp.setDescription(dto.getDescription());
        exp.setTimeline(dto.getTimeline());
        exp.setNameOfInstitute(dto.getNameOfInstitute());

        profile.addExperience(exp);
        studentProfileRepo.save(profile);
    }

    public void updateExperience(Long userId, Long experienceId, ExperienceDTO dto) {

        studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Experience exp = experienceRepo.findById(experienceId)
                .orElseThrow(() -> new RuntimeException("Experience not found!"));

        if (!exp.getProfileDetails().getProfileId().equals(userId)) {
            throw new RuntimeException("Experience does not belong to this user!");
        }

        exp.setTitle(dto.getTitle());
        exp.setDescription(dto.getDescription());
        exp.setTimeline(dto.getTimeline());
        exp.setNameOfInstitute(dto.getNameOfInstitute());

        experienceRepo.save(exp);
    }

    public void deleteExperience(Long userId, Long experienceId) {

        studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        Experience exp = experienceRepo.findById(experienceId)
                .orElseThrow(() -> new RuntimeException("Experience not found!"));

        if (!exp.getProfileDetails().getProfileId().equals(userId)) {
            throw new RuntimeException("Experience does not belong to this user!");
        }

        experienceRepo.delete(exp);
    }

    // ==================== RESUME ====================

    public void uploadResume(Long userId, MultipartFile file) throws IOException {

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        profile.setFileName(file.getOriginalFilename());
        profile.setData(file.getBytes());
        studentProfileRepo.save(profile);
    }

    public EducationDTO.ResumeDownloadResponse downloadMyResume(Long applicationId, Long userId) {
        User student = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentProfileDetails profile = studentProfileRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        return EducationDTO.ResumeDownloadResponse.builder()
                .fileName(profile.getFileName())
                .fileData(profile.getData())
                .build();
    }

    // ==================== MAPPERS ====================

    private EducationResponseDTO mapEducation(Education edu) {

        return EducationResponseDTO.builder()
                .educationId(edu.getEducation_id())
                .title(edu.getTitle())
                .description(edu.getDescription())
                .nameOfInstitute(edu.getNameOfInstitute())
                .timeline(edu.getTimeline())
                .build();
    }

    private ExperienceResponseDTO mapExperience(Experience exp) {

        return ExperienceResponseDTO.builder()
                .experienceId(exp.getExperience_id())
                .title(exp.getTitle())
                .description(exp.getDescription())
                .nameOfInstitute(exp.getNameOfInstitute())
                .timeline(exp.getTimeline())
                .build();
    }

    // Helper: Map User to StudentProfileResponse
    private StudentProfileResponse mapToProfileResponse(User user) {
        return StudentProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .educationList(user.getProfileDetails()
                        .getEducationList()
                        .stream()
                        .map(this::mapEducation)
                        .collect(Collectors.toList()))
                .experienceList(user.getProfileDetails()
                        .getExperienceList()
                        .stream()
                        .map(this::mapExperience)
                        .collect(Collectors.toList())

                )
                .aboutMe(user.getProfileDetails().getAboutMe())
                .bio(user.getProfileDetails().getBio())
                .skillSet(user.getProfileDetails().getSkillSet())
                .build();
    }

    // Get currently logged-in user
    public StudentProfileResponse getCurrentUser(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToProfileResponse(user);
    }
}

