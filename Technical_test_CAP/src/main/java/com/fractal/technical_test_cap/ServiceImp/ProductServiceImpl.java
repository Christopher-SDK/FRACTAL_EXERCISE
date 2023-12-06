package com.fractal.technical_test_cap.ServiceImp;

import com.fractal.technical_test_cap.DTO.ProductDTO;
import com.fractal.technical_test_cap.Model.Order;
import com.fractal.technical_test_cap.Model.Product;
import com.fractal.technical_test_cap.Model.ProductOrder;
import com.fractal.technical_test_cap.Repository.OrderRepository;
import com.fractal.technical_test_cap.Repository.ProductOrderRepository;
import com.fractal.technical_test_cap.Repository.ProductRepository;
import com.fractal.technical_test_cap.Service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public ProductDTO saveProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        return modelMapper.map(productRepository.save(product), ProductDTO.class);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO newProductDTO) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product existingProductEntity = existingProduct.get();
            existingProductEntity.setName(newProductDTO.getName());
            existingProductEntity.setUnitPrice(newProductDTO.getUnitPrice());
            existingProductEntity.setQuantity(newProductDTO.getQuantity());
            return modelMapper.map(productRepository.save(existingProductEntity), ProductDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product != null ? modelMapper.map(product, ProductDTO.class) : null;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findAllByOrder_NumberCategoryByUser(String numberCategory, Long idUser) {
        return productRepository.findAllByOrder_NumberOrderByUser(numberCategory, idUser)
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void asignarOrder(Long idProduct, Long idOrder) {
        ProductDTO productDTO = getProductById(idProduct);

        if (productDTO != null) {
            Order order = orderRepository.findById(idOrder).orElse(null);

            if (order != null) {
                asignarOrder(productDTO, order);
            }
        }
    }

    @Transactional
    public void asignarOrder(ProductDTO productDTO, Order order) {
        ProductOrder productOrder = new ProductOrder();
        productOrder.setProduct(modelMapper.map(productDTO, Product.class));
        productOrder.setOrder(order);
        productOrderRepository.save(productOrder);
    }
}
