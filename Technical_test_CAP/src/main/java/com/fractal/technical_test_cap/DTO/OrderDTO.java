package com.fractal.technical_test_cap.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long orderId;
    private String orderNumber;
    private Date orderDate;
    private int numOfProducts;
    private String status;
    private Long userId;
}
