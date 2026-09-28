package _AD014.Exam.usecase.repo;

import _AD014.Exam.usecase.models.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiclesRepository extends JpaRepository<Vehicles, Long> {
}