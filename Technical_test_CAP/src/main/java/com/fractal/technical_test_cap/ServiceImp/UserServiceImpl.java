package com.fractal.technical_test_cap.ServiceImp;


import com.fractal.technical_test_cap.DTO.DTOUser;
import com.fractal.technical_test_cap.Model.AuthorityName;
import com.fractal.technical_test_cap.Model.User;
import com.fractal.technical_test_cap.Repository.AuthorityRepository;
import com.fractal.technical_test_cap.Repository.UserRepository;
import com.fractal.technical_test_cap.Service.UserService;
import com.fractal.technical_test_cap.exceptions.IncompleteDataException;
import com.fractal.technical_test_cap.exceptions.KeyRepeatedDataException;
import com.fractal.technical_test_cap.exceptions.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthorityRepository authorityRepository;

    @Override
    public User findById(Long id) {
        User userFound = userRepository.findById(id).orElse(null);
        if (userFound == null) {
            throw new ResourceNotFoundException("There are no User with the id: "+String.valueOf(id));
        }
        return userFound;
    }


    @Override
    public User register(DTOUser user) {

        if (user.getUserName().length()>4 && user.getPassword().length()>4) {

            User userFound = userRepository.findByUserName(user.getUserName());
            if (userFound != null) {
                throw new KeyRepeatedDataException("User name can not be duplicated");
            };

            User newUser = new User();
            newUser.setUserName(user.getUserName());

            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
            newUser.setBirthdate(user.getBirthdate());

            newUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            newUser.setEnabled(true);
            newUser.setPasswordLastUpdate(new Date());
            AuthorityName authorityName=AuthorityName.ROLE_USUARIO;
            if (user.getType().equals("ROLE_USUARIO")) authorityName= AuthorityName.ROLE_USUARIO;
            newUser.setAuthorities(
                    List.of(
                            authorityRepository.findByName(authorityName)
                    )
            );

            return userRepository.save(newUser);
        } else {
            throw new IncompleteDataException("User name and password length can not be less than 4 characters");
        }
    }

    @Override
    public User changePassword(DTOUser user) {
        if (user.getUserName().length()>4 && user.getPassword().length()>4) {

            User userFound = userRepository.findByUserName(user.getUserName());
            if (userFound == null) {
                throw new ResourceNotFoundException("User name can not be found");
            };

            userFound.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userFound.setPasswordLastUpdate(new Date());
            return userRepository.save(userFound);
        } else {
            throw new IncompleteDataException("User name and password length can not be less than 4 characters");
        }
    }

    @Override
    public List<User> list() {
        return userRepository.findAll();
    }
}
