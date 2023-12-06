package com.fractal.technical_test_cap.Repository;

import com.fractal.technical_test_cap.Model.Authority;
import com.fractal.technical_test_cap.Model.AuthorityName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority,Long> {
    public Authority findByName(AuthorityName name);
}
