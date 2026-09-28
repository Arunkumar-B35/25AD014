package _AD014.Exam.usecase.service;

import _AD014.Exam.usecase.models.Bay;
import _AD014.Exam.usecase.repo.BayRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BayService {

    private final BayRepository bayRepository;

    public BayService(BayRepository bayRepository) {
        this.bayRepository = bayRepository;
    }

    public List<Bay> getAllBays() {
        return bayRepository.findAll();
    }

    public Bay getBayById(Long id) {
        return bayRepository.findById(id).orElse(null);
    }

    public Bay createBay(Bay bay) {
        return bayRepository.save(bay);
    }

    public Bay updateBay(Long id, Bay bay) {

        Bay existingBay = bayRepository.findById(id).orElse(null);

        if (existingBay == null) {
            return null;
        }

        existingBay.setBayNumber(bay.getBayNumber());
        existingBay.setAvailable(bay.isAvailable());

        return bayRepository.save(existingBay);
    }

    public void deleteBay(Long id) {
        bayRepository.deleteById(id);
    }
}