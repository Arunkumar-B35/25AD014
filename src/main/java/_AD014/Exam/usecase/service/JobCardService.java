package _AD014.Exam.usecase.service;

import _AD014.Exam.usecase.models.jobcard;
import _AD014.Exam.usecase.repo.JobCardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobCardService {

    private final JobCardRepository jobCardRepository;

    public JobCardService(JobCardRepository jobCardRepository) {
        this.jobCardRepository = jobCardRepository;
    }

    // Get all job cards
    public List<jobcard> getAllJobCards() {
        return jobCardRepository.findAll();
    }

    // Get job card by ID
    public jobcard getJobCardById(Long id) {
        return jobCardRepository.findById(id)
                .orElse(null);
    }

    // Create job card
    public jobcard createJobCard(jobcard jobCard) {
        return jobCardRepository.save(jobCard);
    }

    // Update job card
    public jobcard updateJobCard(Long id, jobcard jobCard) {

        jobcard existingJobCard = jobCardRepository.findById(id)
                .orElse(null);

        if (existingJobCard == null) {
            return null;
        }

        existingJobCard.setDescription(jobCard.getDescription());
        existingJobCard.setStatus(jobCard.getStatus());
        existingJobCard.setServiceType(jobCard.getServiceType());
        existingJobCard.setEstimatedCost(jobCard.getEstimatedCost());

        return jobCardRepository.save(existingJobCard);
    }

    // Delete job card
    public void deleteJobCard(Long id) {
        jobCardRepository.deleteById(id);
    }
}