package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepo extends JpaRepository<Application, Long> {

}
