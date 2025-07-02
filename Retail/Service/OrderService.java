package com.retail.Retail.Service;

import com.retail.Retail.Model.*;
import com.retail.Retail.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(OrderRequest orderRequest) {
        Vendor vendor = vendorRepository.findById(orderRequest.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        Product product = productRepository.findById(orderRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Order order = new Order();
        order.setVendor(vendor);
        order.setProduct(product);
        order.setDate(orderRequest.getDate());

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByVendor(Long vendorId) {
        return orderRepository.findByVendorId(vendorId);
    }
    
    public long getOrderCount() {
        return orderRepository.count();
    }

}
