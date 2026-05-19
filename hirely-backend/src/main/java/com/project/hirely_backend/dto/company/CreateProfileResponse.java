package com.project.hirely_backend.dto.company;

import jakarta.persistence.ElementCollection;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class CreateProfileResponse {

    private Long Id;

    private String legalName;

    private String primaryIndustry;

    private String website;

    private String headquarters;

    private String tagline;

    private String aboutCompany;

    private String missionStatement;

    @ElementCollection
    private List<String> coreValues;
}
