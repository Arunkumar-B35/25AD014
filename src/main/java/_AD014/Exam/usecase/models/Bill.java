package _AD014.Exam.usecase.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(0)
    private Double partsCharges;

    @NotNull
    @Min(0)
    private Double labourCharges;

    @NotNull
    @Min(0)
    private Double totalAmount;
}