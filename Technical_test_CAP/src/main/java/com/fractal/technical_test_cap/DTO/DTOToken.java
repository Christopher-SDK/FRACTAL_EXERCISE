package com.fractal.technical_test_cap.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DTOToken {
    String jwtToken;
    Long id;
}
