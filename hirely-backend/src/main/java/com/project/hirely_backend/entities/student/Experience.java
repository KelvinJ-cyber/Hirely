package com.project.hirely_backend.entities.student;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Experience extends BaseProfileItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long experience_id;

    @ManyToOne
    @JoinColumn(name = "id")
    private StudentProfileDetails profileDetails;

}
