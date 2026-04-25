package com.project.hirely_backend.entities.student;

import com.project.hirely_backend.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfileDetails{

    @Id
    private Long id;
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
    private List<Education> educationList;

    @OneToMany(mappedBy = "profileDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experienceList;


    public void addEducation(Education edu) {
        educationList.add(edu);
        edu.setProfileDetails(this);
    }

    public void addExperience(Experience exp) {
        experienceList.add(exp);
        exp.setProfileDetails(this);
    }

}
