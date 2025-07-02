package com.retail.Retail.Repository;

import com.retail.Retail.Model.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByVendorId(Long vendorId);
}
