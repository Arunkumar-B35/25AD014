package _AD014.Exam.usecase.repo;

import _AD014.Exam.usecase.models.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicles, Long> {
}