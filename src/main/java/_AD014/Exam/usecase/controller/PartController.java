package _AD014.Exam.usecase.controller;

import _AD014.Exam.usecase.models.Part;
import _AD014.Exam.usecase.service.PartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartController {

    private final PartService partService;

    public PartController(PartService partService) {
        this.partService = partService;
    }

    @GetMapping
    public List<Part> getAllParts() {
        return partService.getAllParts();
    }

    @GetMapping("/{id}")
    public Part getPartById(@PathVariable Long id) {
        return partService.getPartById(id);
    }

    @PostMapping
    public Part createPart(@RequestBody Part part) {
        return partService.createPart(part);
    }

    @PutMapping("/{id}")
    public Part updatePart(@PathVariable Long id, @RequestBody Part part) {
        return partService.updatePart(id, part);
    }

    @DeleteMapping("/{id}")
    public String deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return "Part deleted successfully";
    }
}