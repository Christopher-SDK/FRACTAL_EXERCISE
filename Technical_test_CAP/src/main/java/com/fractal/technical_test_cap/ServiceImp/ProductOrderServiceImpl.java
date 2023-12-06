package com.fractal.technical_test_cap.ServiceImp;

import com.fractal.technical_test_cap.DTO.ProductOrderDTO;
import com.fractal.technical_test_cap.Model.Order;
import com.fractal.technical_test_cap.Model.Product;
import com.fractal.technical_test_cap.Model.ProductOrder;
import com.fractal.technical_test_cap.Model.User;
import com.fractal.technical_test_cap.Repository.OrderRepository;
import com.fractal.technical_test_cap.Repository.ProductOrderRepository;
import com.fractal.technical_test_cap.Repository.ProductRepository;
import com.fractal.technical_test_cap.Repository.UserRepository;
import com.fractal.technical_test_cap.Service.ProductOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductOrderServiceImpl implements ProductOrderService {

    @Autowired
    private ProductOrderRepository productOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProductOrderDTO saveProductOrder(ProductOrderDTO productOrderDTO) {

        ProductOrder productOrder = new ProductOrder();

        // Establecemos directamente las instancias de Product, Order y User
        productOrder.setProduct(productRepository.findById(productOrderDTO.getProductId()).orElse(new Product()));
        productOrder.setOrder(orderRepository.findById(productOrderDTO.getOrderId()).orElse(new Order()));
        productOrder.setUser(userRepository.findById(productOrderDTO.getUserId()).orElse(new User()));

        // Calculamos el totalAmount
        productOrder.calculateTotalAmount();

        // Guardamos la entidad
        ProductOrder savedProductOrder = productOrderRepository.save(productOrder);

        // Actualizamos el valor de totalAmount en el DTO
        productOrderDTO.setTotalAmount(savedProductOrder.getTotalAmount());

        // Devolvemos el DTO actualizado
        return productOrderDTO;
    }

    @Override
    public List<ProductOrderDTO> listAllProductOrderByUser(Long idUser) {
        List<ProductOrder> productOrders = productOrderRepository.findAllByUser_Id(idUser);

        return productOrders.stream()
                .map(productOrder -> modelMapper.map(productOrder, ProductOrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductOrderDTO getProductOrderById(Long id) {
        Optional<ProductOrder> productOrderOptional = productOrderRepository.findById(id);
        return productOrderOptional.map(value -> modelMapper.map(value, ProductOrderDTO.class)).orElse(null);
    }

    @Override
    public void deleteRelacion(Long id) {
        productOrderRepository.deleteById(id);
    }
}
