package com.fractal.technical_test_cap.Service;

import com.fractal.technical_test_cap.DTO.ProductDTO;

import java.util.List;

public interface ProductService {
    ProductDTO saveProduct(ProductDTO productDTO);

    ProductDTO updateProduct(Long id, ProductDTO newProductDTO);

    void deleteProductById(Long id);

    ProductDTO getProductById(Long id);

    List<ProductDTO> getAllProducts();

    List<ProductDTO> findAllByOrder_NumberCategoryByUser(String numberCategory, Long idUser);

    void asignarOrder(Long idNote, Long idOrder );
}
