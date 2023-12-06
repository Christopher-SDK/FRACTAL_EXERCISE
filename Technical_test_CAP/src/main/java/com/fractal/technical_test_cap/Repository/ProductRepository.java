package com.fractal.technical_test_cap.Repository;

import com.fractal.technical_test_cap.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Consulta para obtener todos los productos por orden de un usuario
    @Query("SELECT p FROM Product p JOIN p.productOrders po JOIN po.order o WHERE o.user.id = :idUser AND o.orderNumber = :orderNumber")
    List<Product> findAllByOrder_NumberOrderByUser(@Param("orderNumber") String orderNumber, @Param("idUser") Long idUser);
}
