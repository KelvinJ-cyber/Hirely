package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

    Optional <Application> findByIdAndJobCompanyId(Long applicationId, Long companyId);

    List<Application> findByStudentId(Long studentId);

    // Find application by ID and student ID to ensure the student can only access their own applications
    Optional<Application> findByIdAndStudentId(Long applicationId, Long studentId);
}
