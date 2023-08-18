// app/api/courses.ts
export async function fetchCourseById(id: number) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/courses/${id}`, // Use the correct API endpoint for courses by id
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const courseData = await response.json();

    if (courseData && courseData.data) {
      return courseData.data.attributes; // Access the attributes of the course data
    } else {
      return null; // Course not found
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    return null;
  }
}

export default fetchCourseById;
