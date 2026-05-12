package com.project.hirely_backend.entities.student;

import com.project.hirely_backend.entities.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfileDetails{

    @Id
    private Long profileId;
    private String aboutMe;
    private String bio;

    @ElementCollection
    private List<String> skillSet;

    // Resume files storage
    private String fileName;
    @Lob
    private byte[] data;

    @OneToOne
    @MapsId
    @JoinColumn(name = "profile_id")
    private User user;

    @OneToMany(mappedBy = "profileDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educationList = new ArrayList<>();

    @OneToMany(mappedBy = "profileDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experienceList = new ArrayList<>();


    public void addEducation(Education edu) {
        educationList.add(edu);
        edu.setProfileDetails(this);
    }

    public void addExperience(Experience exp) {
        experienceList.add(exp);
        exp.setProfileDetails(this);
    }

}
