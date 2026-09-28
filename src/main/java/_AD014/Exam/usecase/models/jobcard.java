package _AD014.Exam.usecase.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class jobcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String status;

    private String serviceType;

    private Double estimatedCost;
}
