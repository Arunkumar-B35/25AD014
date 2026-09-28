package _AD014.Exam.usecase;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "_AD014.Exam.usecase.repo")
public class UsecaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsecaseApplication.class, args);
	}
}
