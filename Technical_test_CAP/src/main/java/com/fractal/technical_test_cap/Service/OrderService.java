package com.fractal.technical_test_cap.Service;

import com.fractal.technical_test_cap.DTO.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO saveOrder(OrderDTO orderDTO);

    List<OrderDTO> findAllOrdersByUser(Long idUser);

    OrderDTO updateOrder (OrderDTO orderDTO);

    void deleteOrder(Long id);

    OrderDTO getOrderById(Long id);

    List<OrderDTO> findAllByNumberOrder(String numberOrder);
}
