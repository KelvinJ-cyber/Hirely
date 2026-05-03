package com.project.hirely_backend.service;


import com.project.hirely_backend.dto.auth.AuthResponse;
import com.project.hirely_backend.dto.auth.LoginRequest;
import com.project.hirely_backend.dto.auth.RegisterRequest;
import com.project.hirely_backend.entities.Roles;
import com.project.hirely_backend.entities.User;
import com.project.hirely_backend.repo.UserRepo;
import com.project.hirely_backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register (RegisterRequest registerRequest) {

        // Check if email already exists
        if(userRepo.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }



        // Build user entity
        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(registerRequest.getRoles())
                .fullName(registerRequest.getFullName())
                .phone(registerRequest.getPhone())
                .isApproved(registerRequest.getRoles() != Roles.COMPANY) // Auto-approve non-company users
                .isActive(true)
                .build();

        userRepo.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRoles());

        return AuthResponse.builder()
                .userId(user.getId())
                .token(token)
                .email(user.getEmail())
                .roles(user.getRoles())
                .fullName(user.getFullName())
                .message("Registration successful" +
                        (user.getRoles() == Roles.COMPANY ? ". Awaiting admin approval." : ""))
                .build();

    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Check if account is active
        if (!user.getIsActive()) {
            throw new RuntimeException("Account is suspended. Contact admin.");
        }

        // Check if company is approved
        if (user.getRoles() == Roles.COMPANY && !user.getIsApproved()) {
            throw new RuntimeException("Company account pending approval");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRoles());

        return AuthResponse.builder()
                .userId(user.getId())
                .token(token)
                .email(user.getEmail())
                .roles(user.getRoles())
                .fullName(user.getFullName())
                .message("Login successful")
                .build();
    }


}
