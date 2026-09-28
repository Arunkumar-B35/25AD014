package _AD014.Exam.usecase.repo;

import _AD014.Exam.usecase.models.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}