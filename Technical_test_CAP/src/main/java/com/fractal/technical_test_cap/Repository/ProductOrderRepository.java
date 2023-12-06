package com.fractal.technical_test_cap.Repository;

import com.fractal.technical_test_cap.Model.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {
    @Query("SELECT po FROM ProductOrder po WHERE po.user.id = :idUser")
    List<ProductOrder> findAllByUser_Id(@Param("idUser") Long idUser);
}
