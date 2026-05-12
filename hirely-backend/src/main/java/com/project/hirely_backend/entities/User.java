package com.project.hirely_backend.entities;

import com.project.hirely_backend.entities.company.CompanyProfileDetails;
import com.project.hirely_backend.entities.student.StudentProfileDetails;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Email()
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Roles roles;

    @Column(nullable = false)
    private String fullName;

    private String phone;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private StudentProfileDetails profileDetails;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private CompanyProfileDetails companyDetails;

    @Column(nullable = false)
    private Boolean isApproved = false;

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
