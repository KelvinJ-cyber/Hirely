package com.project.hirely_backend.entities.student;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public abstract class BaseProfileItems {

    private String title;
    private String description;
    private String nameOfInstitute;
    private String timeline;

}
