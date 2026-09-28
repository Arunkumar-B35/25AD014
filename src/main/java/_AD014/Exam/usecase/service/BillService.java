package _AD014.Exam.usecase.service;

import _AD014.Exam.usecase.models.Bill;
import _AD014.Exam.usecase.repo.BillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill getBillById(Long id) {
        return billRepository.findById(id).orElse(null);
    }

    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }

    public Bill updateBill(Long id, Bill bill) {

        Bill existingBill = billRepository.findById(id).orElse(null);

        if (existingBill == null) {
            return null;
        }

        existingBill.setPartsCharges(bill.getPartsCharges());
        existingBill.setLabourCharges(bill.getLabourCharges());
        existingBill.setTotalAmount(bill.getTotalAmount());

        return billRepository.save(existingBill);
    }

    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}