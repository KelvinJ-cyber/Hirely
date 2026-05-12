package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.student.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepo extends JpaRepository<Education, Long> {
}
