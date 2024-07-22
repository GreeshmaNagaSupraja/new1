document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    loadCourses();
    loadEnrollments();
    loadLessons();
    loadAssignments();
});

function loadStudents() {
    fetch('/api/students')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#student-table tbody');
            tableBody.innerHTML = '';
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.Student_id}</td>
                    <td>${student.Student_name}</td>
                    <td>${student.Email_id}</td>
                    <td>
                        <button onclick="editStudent(${student.Student_id})">Edit</button>
                        <button onclick="deleteStudent(${student.Student_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadCourses() {
    fetch('/api/courses')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#course-table tbody');
            tableBody.innerHTML = '';
            data.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.Course_id}</td>
                    <td>${course.Course_name}</td>
                    <td>${course.Instructor_id}</td>
                    <td>
                        <button onclick="editCourse(${course.Course_id})">Edit</button>
                        <button onclick="deleteCourse(${course.Course_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadEnrollments() {
    fetch('/api/enrollments')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#enrollment-table tbody');
            tableBody.innerHTML = '';
            data.forEach(enrollment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${enrollment.Enrollment_id}</td>
                    <td>${enrollment.Student_id}</td>
                    <td>${enrollment.Course_id}</td>
                    <td>
                        <button onclick="editEnrollment(${enrollment.Enrollment_id})">Edit</button>
                        <button onclick="deleteEnrollment(${enrollment.Enrollment_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadLessons() {
    fetch('/api/lessons')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#lesson-table tbody');
            tableBody.innerHTML = '';
            data.forEach(lesson => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${lesson.Lesson_id}</td>
                    <td>${lesson.Lesson_title}</td>
                    <td>${lesson.Course_id}</td>
                    <td>
                        <button onclick="editLesson(${lesson.Lesson_id})">Edit</button>
                        <button onclick="deleteLesson(${lesson.Lesson_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadAssignments() {
    fetch('/api/assignments')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#assignment-table tbody');
            tableBody.innerHTML = '';
            data.forEach(assignment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${assignment.Assignment_id}</td>
                    <td>${assignment.Assignment_title}</td>
                    <td>${assignment.Lesson_id}</td>
                    <td>
                        <button onclick="editAssignment(${assignment.Assignment_id})">Edit</button>
                        <button onclick="deleteAssignment(${assignment.Assignment_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function showAddStudentForm() {
    document.getElementById('add-student-form').style.display = 'block';
}

function hideAddStudentForm() {
    document.getElementById('add-student-form').style.display = 'none';
}

function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    fetch('/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Student_name: name, Email_id: email })
    })
        .then(response => response.json())
        .then(() => {
            hideAddStudentForm();
            loadStudents();
        })
        .catch(error => console.error('Error:', error));
}

// Similar functions can be implemented for Courses, Enrollments, Lessons, and Assignments

function showAddCourseForm() {
    document.getElementById('add-course-form').style.display = 'block';
}

function hideAddCourseForm() {
    document.getElementById('add-course-form').style.display = 'none';
}

function addCourse(event) {
    event.preventDefault();
    const name = document.getElementById('course-name').value;
    const instructorId = document.getElementById('instructor-id').value;
    fetch('/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Course_name: name, Instructor_id: instructorId })
    })
        .then(response => response.json())
        .then(() => {
            hideAddCourseForm();
            loadCourses();
        })
        .catch(error => console.error('Error:', error));
}

// Repeat similar functions for Enrollments, Lessons, and Assignments

function showAddEnrollmentForm() {
    document.getElementById('add-enrollment-form').style.display = 'block';
}

function hideAddEnrollmentForm() {
    document.getElementById('add-enrollment-form').style.display = 'none';
}

function addEnrollment(event) {
    event.preventDefault();
    const studentId = document.getElementById('student-id').value;
    const courseId = document.getElementById('course-id').value;
    fetch('/api/enrollments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Student_id: studentId, Course_id: courseId })
    })
        .then(response => response.json())
        .then(() => {
            hideAddEnrollmentForm();
            loadEnrollments();
        })
        .catch(error => console.error('Error:', error));
}

function showAddLessonForm() {
    document.getElementById('add-lesson-form').style.display = 'block';
}

function hideAddLessonForm() {
    document.getElementById('add-lesson-form').style.display = 'none';
}

function addLesson(event) {
    event.preventDefault();
    const title = document.getElementById('lesson-title').value;
    const courseId = document.getElementById('course-id').value;
    fetch('/api/lessons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Lesson_title: title, Course_id: courseId })
    })
        .then(response => response.json())
        .then(() => {
            hideAddLessonForm();
            loadLessons();
        })
        .catch(error => console.error('Error:', error));
}

function showAddAssignmentForm() {
    document.getElementById('add-assignment-form').style.display = 'block';
}

function hideAddAssignmentForm() {
    document.getElementById('add-assignment-form').style.display = 'none';
}

function addAssignment(event) {
    event.preventDefault();
    const title = document.getElementById('assignment-title').value;
    const lessonId = document.getElementById('lesson-id').value;
    fetch('/api/assignments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Assignment_title: title, Lesson_id: lessonId })
    })
        .then(response => response.json())
        .then(() => {
            hideAddAssignmentForm();
            loadAssignments();
        })
        .catch(error => console.error('Error:', error));
}
