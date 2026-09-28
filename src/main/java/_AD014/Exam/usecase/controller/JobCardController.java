package _AD014.Exam.usecase.controller;

import _AD014.Exam.usecase.models.jobcard;
import _AD014.Exam.usecase.service.JobCardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobcards")
public class JobCardController {

    private final JobCardService jobCardService;

    public JobCardController(JobCardService jobCardService) {
        this.jobCardService = jobCardService;
    }

    // Get all job cards
    @GetMapping
    public List<jobcard> getAllJobCards() {
        return jobCardService.getAllJobCards();
    }

    // Get job card by ID
    @GetMapping("/{id}")
    public jobcard getJobCardById(@PathVariable Long id) {
        return jobCardService.getJobCardById(id);
    }

    // Create job card
    @PostMapping
    public jobcard createJobCard(@RequestBody jobcard jobCard) {
        return jobCardService.createJobCard(jobCard);
    }

    // Update job card
    @PutMapping("/{id}")
    public jobcard updateJobCard(
            @PathVariable Long id,
            @RequestBody jobcard jobCard) {

        return jobCardService.updateJobCard(id, jobCard);
    }

    // Delete job card
    @DeleteMapping("/{id}")
    public String deleteJobCard(@PathVariable Long id) {
        jobCardService.deleteJobCard(id);
        return "Job card deleted successfully";
    }
}