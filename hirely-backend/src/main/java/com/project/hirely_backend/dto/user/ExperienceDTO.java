package com.project.hirely_backend.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExperienceDTO {

    private String title;
    private String description;
    private String nameOfInstitute;
    private String timeline;
}
