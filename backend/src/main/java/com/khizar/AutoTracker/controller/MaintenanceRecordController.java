package com.khizar.AutoTracker.controller;
import com.khizar.AutoTracker.model.MaintenanceRecord;
import com.khizar.AutoTracker.service.MaintenanceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceRecordController {

    @Autowired
    private MaintenanceRecordService service;

    @GetMapping
    public List<MaintenanceRecord> getAllRecords() {
        return service.getAllRecords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRecord> getRecordById(@PathVariable String id) {
        MaintenanceRecord record = service.getRecordById(id);
        if (record != null) {
            return ResponseEntity.ok(record);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public MaintenanceRecord createRecord(@RequestBody MaintenanceRecord record) {
        return service.createRecord(record);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceRecord> updateRecord(@PathVariable String id, @RequestBody MaintenanceRecord record) {
        MaintenanceRecord updatedRecord = service.updateRecord(id, record);
        if (updatedRecord != null) {
            return ResponseEntity.ok(updatedRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable String id) {
        service.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}
