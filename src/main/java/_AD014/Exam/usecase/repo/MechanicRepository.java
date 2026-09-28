package _AD014.Exam.usecase.repo;

import _AD014.Exam.usecase.models.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MechanicRepository extends JpaRepository<Mechanic, Long> {
}