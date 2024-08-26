package com.khizar.AutoTracker.repository;
import com.khizar.AutoTracker.model.MaintenanceRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MaintenanceRecordRepository extends MongoRepository<MaintenanceRecord, String> {
}

