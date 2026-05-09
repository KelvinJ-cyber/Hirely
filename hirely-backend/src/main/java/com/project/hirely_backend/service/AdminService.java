package com.project.hirely_backend.service;

import com.project.hirely_backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepo userRepo;


//    // Admin: Get all users by role
//    public List<StudentProfileResponse> getUsersByRole(Roles roles) {
//        return userRepo.findByRoles(roles).stream()
//                .map(this::mapToProfileResponse)
//                .collect(Collectors.toList());
//    }
//
//    // Admin: Approve company
//    public StudentProfileResponse approveCompany(Long companyId) {
//        User company = userRepo.findById(companyId)
//                .orElseThrow(() -> new RuntimeException("Company not found"));
//
//        if (company.getRoles() != Roles.COMPANY) {
//            throw new RuntimeException("User is not a company");
//        }
//
//        company.setIsApproved(true);
//        userRepo.save(company);
//        return mapToProfileResponse(company);
//    }
//
//
//    // Admin: Suspend/Activate user
//    public StudentProfileResponse toggleUserStatus(Long userId) {
//        User user = userRepo.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        user.setIsActive(!user.getIsActive());
//        userRepo.save(user);
//        return mapToProfileResponse(user);
//    }

}
