package com.project.hirely_backend.dto.user;

import com.project.hirely_backend.entities.company.JobType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class StudentJobCardsResponse {

    private Long id;
    private String title;
    private String location;
    private String companyName;
    private JobType jobType;
    private String salary;
    private List<String> techStack;

}
