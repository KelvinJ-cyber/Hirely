package com.project.hirely_backend.repo;


import com.project.hirely_backend.entities.company.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostingRepo extends JpaRepository<JobPosting, Long> {

    Optional<JobPosting> findByIdAndCompanyId(Long jobId, Long companyId);

    List<JobPosting> findByCompanyId(Long id);
}
