package _AD014.Exam.usecase.controller;

import _AD014.Exam.usecase.models.Vehicles;
import _AD014.Exam.usecase.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicles> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{id}")
    public Vehicles getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id);
    }

    @PostMapping
    public Vehicles createVehicle(@RequestBody Vehicles vehicle) {
        return vehicleService.createVehicle(vehicle);
    }

    @PutMapping("/{id}")
    public Vehicles updateVehicle(
            @PathVariable Long id,
            @RequestBody Vehicles vehicle) {

        return vehicleService.updateVehicle(id, vehicle);
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return "Vehicle deleted successfully";
    }
}