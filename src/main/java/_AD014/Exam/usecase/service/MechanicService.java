package _AD014.Exam.usecase.service;

import _AD014.Exam.usecase.models.Mechanic;
import _AD014.Exam.usecase.repo.MechanicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MechanicService {

    private final MechanicRepository mechanicRepository;

    public MechanicService(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    // Get all mechanics
    public List<Mechanic> getAllMechanics() {
        return mechanicRepository.findAll();
    }

    // Get mechanic by ID
    public Mechanic getMechanicById(Long id) {
        return mechanicRepository.findById(id)
                .orElse(null);
    }

    // Create mechanic
    public Mechanic createMechanic(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    // Update mechanic
    public Mechanic updateMechanic(Long id, Mechanic mechanic) {

        Mechanic existingMechanic = mechanicRepository.findById(id)
                .orElse(null);

        if (existingMechanic == null) {
            return null;
        }

        existingMechanic.setName(mechanic.getName());
        existingMechanic.setSpecialization(mechanic.getSpecialization());
        existingMechanic.setAvailable(mechanic.isAvailable());

        return mechanicRepository.save(existingMechanic);
    }

    // Delete mechanic
    public void deleteMechanic(Long id) {
        mechanicRepository.deleteById(id);
    }
}