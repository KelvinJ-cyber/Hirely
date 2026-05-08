package com.project.hirely_backend.dto.auth;

import com.project.hirely_backend.entities.Roles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private Long userId;
    private String email;
    private Roles roles;
    private String fullName;
    private String message;
}