package com.project.hirely_backend.dto.auth;

import com.project.hirely_backend.entities.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    private String email;

    private String password;

    private Role role;

    private String fullName;

    private String phone;

    // For COMPANY role only
    private String companyName;
    private String companyDescription;
}
