package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.Role;
import com.project.hirely_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
    List<User> findByRoleAndIsApproved(Role role, Boolean isApproved);
}
