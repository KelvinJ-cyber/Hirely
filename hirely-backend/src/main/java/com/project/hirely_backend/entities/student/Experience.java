package com.project.hirely_backend.entities.student;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Experience extends BaseProfileItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long experience_id;

    @ManyToOne
    @JoinColumn(name = "id")
    private StudentProfileDetails profileDetails;

}
