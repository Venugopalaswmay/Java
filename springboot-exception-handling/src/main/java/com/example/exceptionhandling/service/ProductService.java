package com.example.exceptionhandling.service;

import com.example.exceptionhandling.dto.ProductDTO;
import com.example.exceptionhandling.exception.BusinessException;
import com.example.exceptionhandling.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    public ProductDTO getProductById(Long id) {
        if (id == 999) {
            throw new ResourceNotFoundException("Product with ID " + id + " not found");
        }
        if (id == 500) {
            throw new RuntimeException("Simulated database failure");
        }
        return new ProductDTO(id, "Sample Product", 100.0);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        if ("Duplicate".equalsIgnoreCase(productDTO.getName())) {
            throw new BusinessException("Product with name '" + productDTO.getName() + "' already exists");
        }
        // Simulate creation
        productDTO.setId(1L);
        return productDTO;
    }
}
