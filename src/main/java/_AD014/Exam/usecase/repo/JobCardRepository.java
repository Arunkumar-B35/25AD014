package _AD014.Exam.usecase.repo;

import _AD014.Exam.usecase.models.jobcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobCardRepository extends JpaRepository<jobcard, Long> {
}