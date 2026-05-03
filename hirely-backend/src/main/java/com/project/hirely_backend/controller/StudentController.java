package com.project.hirely_backend.controller;

import com.project.hirely_backend.dto.user.CreateProfileRequest;
import com.project.hirely_backend.dto.user.EducationDTO;
import com.project.hirely_backend.dto.user.ExperienceDTO;
import com.project.hirely_backend.dto.user.UserProfileResponse;
import com.project.hirely_backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/create/{userId}")
    public void createProfile(@PathVariable Long userId,
                              @RequestBody CreateProfileRequest dto) {
        studentService.createProfile(userId, dto);
    }

    @PostMapping("/education/{userId}")
    public void addEducation(@PathVariable Long userId,
                             @RequestBody EducationDTO dto) {
        studentService.addEducation(userId, dto);
    }

    @PostMapping("/experience/{userId}")
    public void addExperience(@PathVariable Long userId,
                              @RequestBody ExperienceDTO dto) {
        studentService.addExperience(userId, dto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser() {
        return ResponseEntity.ok(studentService.getCurrentUser());
    }


}
