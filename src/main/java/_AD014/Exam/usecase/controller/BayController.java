package _AD014.Exam.usecase.controller;

import _AD014.Exam.usecase.models.Bay;
import _AD014.Exam.usecase.service.BayService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bays")
public class BayController {

    private final BayService bayService;

    public BayController(BayService bayService) {
        this.bayService = bayService;
    }

    @GetMapping
    public List<Bay> getAllBays() {
        return bayService.getAllBays();
    }

    @GetMapping("/{id}")
    public Bay getBayById(@PathVariable Long id) {
        return bayService.getBayById(id);
    }

    @PostMapping
    public Bay createBay(@RequestBody Bay bay) {
        return bayService.createBay(bay);
    }

    @PutMapping("/{id}")
    public Bay updateBay(@PathVariable Long id, @RequestBody Bay bay) {
        return bayService.updateBay(id, bay);
    }

    @DeleteMapping("/{id}")
    public String deleteBay(@PathVariable Long id) {
        bayService.deleteBay(id);
        return "Bay deleted successfully";
    }
}