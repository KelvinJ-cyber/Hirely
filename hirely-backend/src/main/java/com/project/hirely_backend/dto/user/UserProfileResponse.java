package com.project.hirely_backend.dto.user;

import com.project.hirely_backend.entities.student.Education;
import com.project.hirely_backend.entities.student.Experience;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class UserProfileResponse {

    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private List<Education> educationList;
    private  List<Experience> experienceList;
    private String aboutMe;
    private String bio;
    private List<String> skillSet;

}

