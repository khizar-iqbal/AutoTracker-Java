package com.khizar.AutoTracker.service;
import com.khizar.AutoTracker.model.MaintenanceRecord;
import com.khizar.AutoTracker.repository.MaintenanceRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MaintenanceRecordService {

    @Autowired
    private MaintenanceRecordRepository repository;

    public List<MaintenanceRecord> getAllRecords() {
        return repository.findAll();
    }

    public MaintenanceRecord getRecordById(String id) {
        return repository.findById(id).orElse(null);
    }

    public MaintenanceRecord createRecord(MaintenanceRecord record) {
        return repository.save(record);
    }

    public MaintenanceRecord updateRecord(String id, MaintenanceRecord record) {
        if (repository.existsById(id)) {
            record.setId(id);
            return repository.save(record);
        } else {
            return null;
        }
    }

    public void deleteRecord(String id) {
        repository.deleteById(id);
    }
}

