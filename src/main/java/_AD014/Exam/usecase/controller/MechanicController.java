package _AD014.Exam.usecase.controller;

import _AD014.Exam.usecase.models.Mechanic;
import _AD014.Exam.usecase.service.MechanicService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
public class MechanicController {

    private final MechanicService mechanicService;

    public MechanicController(MechanicService mechanicService) {
        this.mechanicService = mechanicService;
    }

    // Get all mechanics
    @GetMapping
    public List<Mechanic> getAllMechanics() {
        return mechanicService.getAllMechanics();
    }

    // Get mechanic by ID
    @GetMapping("/{id}")
    public Mechanic getMechanicById(@PathVariable Long id) {
        return mechanicService.getMechanicById(id);
    }

    // Create mechanic
    @PostMapping
    public Mechanic createMechanic(@RequestBody Mechanic mechanic) {
        return mechanicService.createMechanic(mechanic);
    }

    // Update mechanic
    @PutMapping("/{id}")
    public Mechanic updateMechanic(
            @PathVariable Long id,
            @RequestBody Mechanic mechanic) {

        return mechanicService.updateMechanic(id, mechanic);
    }

    // Delete mechanic
    @DeleteMapping("/{id}")
    public String deleteMechanic(@PathVariable Long id) {
        mechanicService.deleteMechanic(id);
        return "Mechanic deleted successfully";
    }
}