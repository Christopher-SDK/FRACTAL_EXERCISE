package com.fractal.technical_test_cap.ServiceImp;

import com.fractal.technical_test_cap.DTO.ProductOrderDTO;
import com.fractal.technical_test_cap.Model.ProductOrder;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Add explicit mappings
        modelMapper.addMappings(new PropertyMap<ProductOrder, ProductOrderDTO>() {
            protected void configure() {
                map().setOrderId(source.getOrder().getOrderId());
                map().setProductId(source.getProduct().getProductId());
            }
        });

        return modelMapper;
    }
}
