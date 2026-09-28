package _AD014.Exam.usecase.dto;

import lombok.Data;

@Data
public class PartDTO {

    private String partName;

    private String partNumber;

    private Integer quantity;

    private Double price;
}