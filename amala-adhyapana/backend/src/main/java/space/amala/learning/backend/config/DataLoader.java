package space.amala.learning.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import space.amala.learning.backend.model.Course;
import space.amala.learning.backend.repository.CourseRepository;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(CourseRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        Course.builder()
                                .title("Introduction to Java")
                                .description("Learn the basics of Java programming, object-oriented concepts, and build your first application.")
                                .category("Programming")
                                .imageUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60")
                                .build(),
                        Course.builder()
                                .title("Mastering Angular")
                                .description("Deep dive into Angular components, services, RxJS, and modern web application development.")
                                .category("Web Development")
                                .imageUrl("https://images.unsplash.com/photo-1627398246734-ec85cb0f9226?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60")
                                .build(),
                        Course.builder()
                                .title("Web Design for Beginners")
                                .description("Learn how to create beautiful, responsive layouts using HTML, CSS, and modern design principles.")
                                .category("Design")
                                .imageUrl("https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60")
                                .build(),
                        Course.builder()
                                .title("Spring Boot Microservices")
                                .description("Build scalable back-end architectures with Spring Boot, Spring Cloud, and Docker.")
                                .category("Backend Development")
                                .imageUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60")
                                .build()
                ));
            }
        };
    }
}
