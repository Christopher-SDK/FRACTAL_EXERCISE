package com.fractal.technical_test_cap.Repository;
import com.fractal.technical_test_cap.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUserName(String userName);
}
