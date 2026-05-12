package com.project.hirely_backend.dto.user;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StudentProfileResponse {

    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private List<EducationResponseDTO> educationList;
    private  List<ExperienceResponseDTO> experienceList;
    private String aboutMe;
    private String bio;
    private List<String> skillSet;

}

