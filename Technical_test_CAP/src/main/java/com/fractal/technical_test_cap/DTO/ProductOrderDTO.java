package com.fractal.technical_test_cap.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductOrderDTO {

    private Long idProductOrder;
    private Long productId;
    private Long orderId;
    private Long userId;
    private double totalAmount;
}
