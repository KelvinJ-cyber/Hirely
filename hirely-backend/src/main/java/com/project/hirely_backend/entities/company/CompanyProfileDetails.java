package com.project.hirely_backend.entities.company;

import com.project.hirely_backend.entities.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyProfileDetails{

    @Id
    private Long profileId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "profile_id")
    private User user;

    private String legalName;

    private String primaryIndustry;

    private String website;

    private String headquarters;

    private String tagline;

    private String aboutCompany;

    private String missionStatement;

    @ElementCollection
    private List<String> coreValues;


}
