package com.project.hirely_backend.entities.student;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Education extends BaseProfileItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long education_id;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private StudentProfileDetails profileDetails;

}
