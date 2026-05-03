package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.student.StudentProfileDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepo extends JpaRepository<StudentProfileDetails, Long> {
}
