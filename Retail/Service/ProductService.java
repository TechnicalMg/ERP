package com.retail.Retail.Service;

import java.util.List;

import com.retail.Retail.Model.*;
import com.retail.Retail.Repository.*;

import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public Product saveProduct(Product product) {
        return repo.save(product);
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }
}
