package com.fractal.technical_test_cap.Repository;

import com.fractal.technical_test_cap.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.orderNumber = :orderNumber")
    List<Order> findAllByNumberOrder(@Param("orderNumber") String orderNumber);
    @Query("SELECT o FROM Order o WHERE o.user.id = :idUser")
    List<Order> findAllByUser_Id(@Param("idUser") Long idUser);
}
