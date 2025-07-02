package com.retail.Retail.Repository;

import com.retail.Retail.Model.UploadData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UploadRepo extends JpaRepository<UploadData, Long> {

	Optional<UploadData> findByName(String name);
}
