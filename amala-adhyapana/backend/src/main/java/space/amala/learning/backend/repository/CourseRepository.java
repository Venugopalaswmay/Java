package space.amala.learning.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.amala.learning.backend.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
