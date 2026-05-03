package com.project.hirely_backend.entities.student;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
public class Education extends BaseProfileItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long education_id;

    @ManyToOne
    @JoinColumn(name = "id")
    private StudentProfileDetails profileDetails;

}
