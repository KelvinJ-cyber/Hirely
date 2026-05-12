package com.project.hirely_backend.dto.company;

import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProfileRequest {

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
