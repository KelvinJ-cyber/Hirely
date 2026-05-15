package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.Application;
import com.project.hirely_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.ScopedValue;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

    Optional <Application> findByIdAndJobCompanyId(Long applicationId, Long companyId);

    List<Application> findByStudentId(Long studentId);

    // Find application by ID and student ID to ensure the student can only access their own applications
    Optional<Application> findByIdAndStudentId(Long applicationId, Long studentId);
}
