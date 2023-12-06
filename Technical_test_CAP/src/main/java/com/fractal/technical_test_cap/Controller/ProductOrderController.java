package com.fractal.technical_test_cap.Controller;

import com.fractal.technical_test_cap.DTO.ProductOrderDTO;
import com.fractal.technical_test_cap.Service.ProductOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/productorders")
public class ProductOrderController {

    private final ProductOrderService productOrderService;

    public ProductOrderController(ProductOrderService productOrderService) {
        this.productOrderService = productOrderService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductOrderDTO> updateProductOrder(@RequestBody ProductOrderDTO productOrderDTO, @PathVariable Long id) {
        ProductOrderDTO foundnotecategoryDTO = productOrderService.getProductOrderById(id);
        ProductOrderDTO newRelation = productOrderService.saveProductOrder(foundnotecategoryDTO);
        return new ResponseEntity<>(newRelation, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProductOrderDTO> saveProductOrder(@Valid @RequestBody ProductOrderDTO productOrderDTO) {
        ProductOrderDTO savedProductOrderDTO = productOrderService.saveProductOrder(productOrderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProductOrderDTO);
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<ProductOrderDTO>> listAllProductOrderByUser(@PathVariable Long idUser) {
        List<ProductOrderDTO> productOrders = productOrderService.listAllProductOrderByUser(idUser);
        return ResponseEntity.ok(productOrders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductOrderDTO> getProductOrderById(@PathVariable Long id) {
        ProductOrderDTO productOrderDTO = productOrderService.getProductOrderById(id);
        return productOrderDTO != null ? ResponseEntity.ok(productOrderDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductOrder(@PathVariable Long id) {
        productOrderService.deleteRelacion(id);
        return ResponseEntity.noContent().build();
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
