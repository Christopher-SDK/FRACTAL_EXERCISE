package com.fractal.technical_test_cap.Service;



import com.fractal.technical_test_cap.DTO.DTOUser;
import com.fractal.technical_test_cap.Model.User;

import java.util.List;

public interface UserService {

    public User findById(Long id);

    public User register(DTOUser user);

    public User changePassword(DTOUser user);

    public List<User> list();
}
