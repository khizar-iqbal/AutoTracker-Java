package com.khizar.AutoTracker.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "maintenance")
public class MaintenanceRecord {

    @Id
    private String id;
    private CarDetails carDetails;
    private String workDescription;
    private PaymentStatus paymentStatus;

    @Data
    public static class CarDetails {
        private String number;
        private String color;
        private String model;
    }

    @Data
    public static class PaymentStatus {
        private boolean received;
        private String paymentMethod;
    }
}

