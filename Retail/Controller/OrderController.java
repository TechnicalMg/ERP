package com.retail.Retail.Controller;

import com.retail.Retail.Model.*;
import com.retail.Retail.Service.*;

import java.util.List;
import java.util.stream.Collectors;  // ✅ Import Collectors

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Create new order
    @PostMapping("/orders")
    public Order createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    // Get products ordered by a vendor
    @GetMapping("/orders/vendor/{vendorId}")
    public List<Product> getProductsByVendor(@PathVariable Long vendorId) {
        List<Order> orders = orderService.getOrdersByVendor(vendorId);
        return orders.stream()
                     .map(Order::getProduct)
                     .collect(Collectors.toList());
    }

    // Get total count of orders
    @GetMapping("/orders/count")
    public long getOrderCount() {
        return orderService.getOrderCount();
    }
}
