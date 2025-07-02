package com.retail.Retail.Controller;

import com.retail.Retail.Model.Vendor;
import com.retail.Retail.Repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "http://localhost:4200")
public class VendorController {

    @Autowired
    private VendorRepository vendorRepo;

    @PostMapping
    public Vendor createVendor(@RequestBody Vendor vendor) {
        return vendorRepo.save(vendor);
    }

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorRepo.findAll();
    }

    @GetMapping("/count")
    public long getVendorCount() {
        return vendorRepo.count();
    }
}