package com.retail.Retail.Repository;

import com.retail.Retail.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
