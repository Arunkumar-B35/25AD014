package _AD014.Exam.usecase.service;

import _AD014.Exam.usecase.models.Vehicles;
import _AD014.Exam.usecase.repo.VehiclesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehiclesService {

    private final VehiclesRepository vehicleRepository;

    public VehiclesService(VehiclesRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    // Get all vehicles
    public List<Vehicles> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Get vehicle by ID
    public Vehicles getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .orElse(null);
    }

    // Create vehicle
    public Vehicles createVehicle(Vehicles vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // Update vehicle
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

    // Delete vehicle
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}