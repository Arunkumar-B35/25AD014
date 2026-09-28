package _AD014.Exam.usecase.repo;

import _AD014.Exam.usecase.models.Part;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartRepository extends JpaRepository<Part, Long> {
}