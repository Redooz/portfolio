export interface ProfessionalExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export const professionalExperience: ProfessionalExperience[] = [
  {
    role: 'Backend Developer',
    company: 'Pragma',
    duration: '07/2024 - 01/2025',
    description: 'Developed and implemented a microservices-based architecture using Java and Spring Boot. Maintained applications for salary reviews and food court systems, ensuring scalability and reliability. Reduced technical debt through unit testing with JUnit and Mockito and managed data storage with MySQL and MongoDB.'
  },
  {
    role: 'Backend Developer',
    company: 'PlayGreen',
    duration: '08/2023 - 11/2023',
    description: 'Built and maintained RESTful APIs using Java, Spring Boot, and MySQL. Focused on backend logic, data flow management, and server-side application integration. Contributed to system stability and scalability by employing robust backend solutions.'
  }
];
