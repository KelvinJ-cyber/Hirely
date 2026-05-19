package com.project.hirely_backend.repo;

import com.project.hirely_backend.entities.company.CompanyProfileDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyProfileDetailsRepo extends JpaRepository<CompanyProfileDetails, Long> {
}
