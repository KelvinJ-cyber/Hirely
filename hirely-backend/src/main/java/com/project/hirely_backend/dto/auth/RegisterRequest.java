package com.project.hirely_backend.dto.auth;

import com.project.hirely_backend.entities.Roles;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    @NotBlank(message = "Password is required")
    private String password;

    private Roles roles;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String phone;

}
