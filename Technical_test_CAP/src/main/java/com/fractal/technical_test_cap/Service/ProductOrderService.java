package com.fractal.technical_test_cap.Service;

import com.fractal.technical_test_cap.DTO.ProductOrderDTO;

import java.util.List;

public interface ProductOrderService {
    ProductOrderDTO saveProductOrder(ProductOrderDTO productOrderDTO);

    List<ProductOrderDTO> listAllProductOrderByUser(Long idUser);

    ProductOrderDTO getProductOrderById(Long id);

    void deleteRelacion(Long id);
}
