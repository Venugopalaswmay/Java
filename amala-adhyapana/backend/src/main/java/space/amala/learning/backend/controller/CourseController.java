package space.amala.learning.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import space.amala.learning.backend.model.Course;
import space.amala.learning.backend.repository.CourseRepository;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Endpoints for managing learning courses")
@CrossOrigin(origins = "*") // For development purposes
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    @Operation(summary = "Get all courses", description = "Retrieves a list of all available courses.")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @PostMapping
    @Operation(summary = "Create a course", description = "Adds a new course to the learning platform.")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseRepository.save(course));
    }
}
