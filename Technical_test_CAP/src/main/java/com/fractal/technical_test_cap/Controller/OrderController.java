package com.fractal.technical_test_cap.Controller;

import com.fractal.technical_test_cap.DTO.OrderDTO;
import com.fractal.technical_test_cap.Service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@Valid @RequestBody OrderDTO orderDTO) {
        OrderDTO savedOrderDTO = orderService.saveOrder(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrderDTO);
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<OrderDTO>> getAllOrdersByUser(@PathVariable Long idUser) {
        List<OrderDTO> orders = orderService.findAllOrdersByUser(idUser);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO orderDTO = orderService.getOrderById(id);
        return orderDTO != null ? ResponseEntity.ok(orderDTO) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        OrderDTO updatedOrderDTO = orderService.updateOrder(orderDTO);
        return updatedOrderDTO != null ? ResponseEntity.ok(updatedOrderDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/number/{numberOrder}")
    public ResponseEntity<List<OrderDTO>> findAllByNumberOrder(@PathVariable String numberOrder) {
        List<OrderDTO> orders = orderService.findAllByNumberOrder(numberOrder);
        return ResponseEntity.ok(orders);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input data");
    }
}
