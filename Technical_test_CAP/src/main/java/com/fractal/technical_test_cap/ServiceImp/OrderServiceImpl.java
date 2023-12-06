package com.fractal.technical_test_cap.ServiceImp;

import com.fractal.technical_test_cap.DTO.OrderDTO;
import com.fractal.technical_test_cap.Model.Order;
import com.fractal.technical_test_cap.Repository.OrderRepository;
import com.fractal.technical_test_cap.Service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public OrderDTO saveOrder(OrderDTO orderDTO) {
        Order order = modelMapper.map(orderDTO, Order.class);

        Order savedOrder = orderRepository.save(order);

        return modelMapper.map(savedOrder, OrderDTO.class);
    }

    @Override
    public List<OrderDTO> findAllOrdersByUser(Long idUser) {
        List<Order> orders = orderRepository.findAllByUser_Id(idUser);

        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO updateOrder(OrderDTO orderDTO) {
        if (orderDTO.getOrderId() != null) {
            Order order = modelMapper.map(orderDTO, Order.class);

            Order updatedOrder = orderRepository.save(order);

            return modelMapper.map(updatedOrder, OrderDTO.class);
        }
        return null;
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        return orderOptional.map(value -> modelMapper.map(value, OrderDTO.class)).orElse(null);
    }

    @Override
    public List<OrderDTO> findAllByNumberOrder(String numberOrder) {
        List<Order> orders = orderRepository.findAllByNumberOrder(numberOrder);

        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }
}
