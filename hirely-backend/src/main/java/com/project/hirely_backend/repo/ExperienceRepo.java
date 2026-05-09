package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.student.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepo extends JpaRepository<Experience, Long> {
}
