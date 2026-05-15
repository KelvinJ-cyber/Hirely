package com.project.hirely_backend.controller;

import com.project.hirely_backend.dto.user.*;
import com.project.hirely_backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    // ==================== PROFILE ====================

    @PostMapping("/create/{userId}")
    public void createProfile(@PathVariable Long userId,
                              @RequestBody CreateProfileRequest dto) {
        studentService.createProfile(userId, dto);
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<String> updateProfile(@PathVariable Long userId,
                                                @RequestBody UpdateProfileRequest dto) {
        studentService.updateProfile(userId, dto);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @GetMapping("/me/{userId}")
    public ResponseEntity<StudentProfileResponse> getCurrentUser(@PathVariable Long userId) {
        return ResponseEntity.ok(studentService.getCurrentUser(userId));
    }

    // ==================== EDUCATION ====================

    @PostMapping("/education/{userId}")
    public void addEducation(@PathVariable Long userId,
                             @RequestBody EducationDTO dto) {
        studentService.addEducation(userId, dto);
    }

    @PutMapping("/education/{userId}/{educationId}")
    public ResponseEntity<String> updateEducation(@PathVariable Long userId,
                                                  @PathVariable Long educationId,
                                                  @RequestBody EducationDTO dto) {
        studentService.updateEducation(userId, educationId, dto);
        return ResponseEntity.ok("Education updated successfully");
    }

    @DeleteMapping("/education/{userId}/{educationId}")
    public ResponseEntity<String> deleteEducation(@PathVariable Long userId,
                                                  @PathVariable Long educationId) {
        studentService.deleteEducation(userId, educationId);
        return ResponseEntity.ok("Education deleted successfully");
    }

    // ==================== EXPERIENCE ====================

    @PostMapping("/experience/{userId}")
    public void addExperience(@PathVariable Long userId,
                              @RequestBody ExperienceDTO dto) {
        studentService.addExperience(userId, dto);
    }

    @PutMapping("/experience/{userId}/{experienceId}")
    public ResponseEntity<String> updateExperience(@PathVariable Long userId,
                                                   @PathVariable Long experienceId,
                                                   @RequestBody ExperienceDTO dto) {
        studentService.updateExperience(userId, experienceId, dto);
        return ResponseEntity.ok("Experience updated successfully");
    }

    @DeleteMapping("/experience/{userId}/{experienceId}")
    public ResponseEntity<String> deleteExperience(@PathVariable Long userId,
                                                   @PathVariable Long experienceId) {
        studentService.deleteExperience(userId, experienceId);
        return ResponseEntity.ok("Experience deleted successfully");
    }

    // ==================== RESUME ====================

    @PostMapping("/resume/{userId}")
    public ResponseEntity<String> uploadResume(@PathVariable Long userId,
                                               @RequestParam("resume") MultipartFile file) throws IOException {
        studentService.uploadResume(userId, file);
        return ResponseEntity.ok("Resume uploaded successfully");
    }
}

