package com.fractal.technical_test_cap.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOUser {
    private Long id;

    private String userName;
    private String password;
    private String type;
    private String firstName;
    private String lastName;
    private Date birthdate;
}
