package _AD014.Exam.usecase.service;

import _AD014.Exam.usecase.models.Vehicles;
import _AD014.Exam.usecase.repo.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicles> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicles getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    public Vehicles createVehicle(Vehicles vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicles updateVehicle(Long id, Vehicles vehicle) {

        Vehicles existingVehicle = vehicleRepository.findById(id)
                .orElse(null);

        if (existingVehicle == null) {
            return null;
        }

        existingVehicle.setRegistrationNumber(
                vehicle.getRegistrationNumber()
        );

        existingVehicle.setOwnerName(
                vehicle.getOwnerName()
        );

        existingVehicle.setVehicleModel(
                vehicle.getVehicleModel()
        );

        existingVehicle.setVehicleType(
                vehicle.getVehicleType()
        );

        return vehicleRepository.save(existingVehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}