package com.project.hirely_backend.dto.user;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceResponseDTO {

    private Long experienceId;
    private String title;
    private String description;
    private String nameOfInstitute;
    private String timeline;

}
