package com.project.hirely_backend.dto.user;


import jakarta.persistence.ElementCollection;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateProfileRequest {

    public String aboutMe;
    private String bio;
    private List<String> skillSets;

}
