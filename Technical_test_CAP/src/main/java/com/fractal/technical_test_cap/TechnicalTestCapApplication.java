package com.fractal.technical_test_cap;

import com.fractal.technical_test_cap.Model.Authority;
import com.fractal.technical_test_cap.Model.AuthorityName;
import com.fractal.technical_test_cap.Model.Product;
import com.fractal.technical_test_cap.Model.Order;
import com.fractal.technical_test_cap.Model.ProductOrder;
import com.fractal.technical_test_cap.Model.User;
import com.fractal.technical_test_cap.Repository.AuthorityRepository;
import com.fractal.technical_test_cap.Repository.UserRepository;
import com.fractal.technical_test_cap.Repository.ProductRepository;
import com.fractal.technical_test_cap.Repository.OrderRepository;
import com.fractal.technical_test_cap.Repository.ProductOrderRepository;
import com.fractal.technical_test_cap.Service.ProductService;
import com.fractal.technical_test_cap.Service.OrderService;
import com.fractal.technical_test_cap.Service.ProductOrderService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class TechnicalTestCapApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechnicalTestCapApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(
            AuthorityRepository authorityRepository,
            UserRepository userRepository
    ) {
        return args -> {
            // Guardar autoridades
            authorityRepository.save(new Authority(AuthorityName.ROLE_USUARIO)); // PONES TODOS TUS ROLES

            authorityRepository.saveAll(
                    List.of(
                            new Authority(AuthorityName.READ),
                            new Authority(AuthorityName.WRITE)
                    )
            );

            // Guardar usuarios
            User user1 = new User(
                    "usuario1",
                    new BCryptPasswordEncoder().encode("password123"),
                    true,
                    new Date(),
                    List.of(
                            authorityRepository.findByName(AuthorityName.ROLE_USUARIO),
                            authorityRepository.findByName(AuthorityName.WRITE)
                    ),
                    "Geronima",
                    "Ripeta",
                    new Date()
            );

            User user2 = new User(
                    "crevilla",
                    new BCryptPasswordEncoder().encode("DISEÑOPERU18!"),
                    true,
                    new Date(),
                    List.of(
                            authorityRepository.findByName(AuthorityName.ROLE_USUARIO),
                            authorityRepository.findByName(AuthorityName.READ)
                    ),
                    "Crecia",
                    "Lopez",
                    new Date()
            );

            userRepository.saveAll(List.of(user1, user2));
        };
    }
}
