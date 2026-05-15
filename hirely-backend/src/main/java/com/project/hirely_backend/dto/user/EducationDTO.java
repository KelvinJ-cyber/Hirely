package com.project.hirely_backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EducationDTO {

    private String title;
    private String description;
    private String nameOfInstitute;
    private String timeline;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResumeDownloadResponse {
        private String fileName;
        private String fileType;
        private byte[] fileData;
    }
}
