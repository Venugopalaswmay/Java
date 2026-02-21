import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  private courseService = inject(CourseService);

  courses: Course[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching courses', err);
        // Fallback for UI visualization if backend is not running yet
        this.error = 'Could not load live courses. Displaying preview data.';
        this.courses = [
          { id: 1, title: 'Preview: Interactive UI', description: 'Sample course while backend connects.', category: 'Design', imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80' }
        ];
        this.loading = false;
      }
    });
  }
}
