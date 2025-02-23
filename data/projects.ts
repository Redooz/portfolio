export interface Project {
  name: string;
  slug: string;
  image: string;
  content: string;
}

export const projects: Project[] = [
  {
    name: "Our Hive",
    slug: "our-hive",
    image:
      "https://raw.githubusercontent.com/Redooz/personal-project-images/refs/heads/main/Our%20Hive%20Admin%20Panel.png",
    content: `# Our Hive
App that allows a user to track their emotions with the purpose of fostering emotional intelligence literacy. Users can share their emotional history with other users.

- Microservices developed using Node.js and Go & admin panel's frontend using Angular.
- Integration of AI Models such as Stable Diffusion and Zero Shot Classification.
- Authentication with Guards (Local & JWT)
- Documentation with Swagger.
- MySQL and Firebase Firestore used as databases.

## Technologies Used
- Node.js
- Go
- Angular
- PostgreSQL
- Firebase: Firestore & Storage
- Swagger
- JWT
`,
  },
  {
    name: "OnClass",
    slug: "onclass",
    image:
      "https://raw.githubusercontent.com/Redooz/personal-project-images/refs/heads/main/On%20Class.png",
    content: `# OnClass

A comprehensive platform for managing bootcamps, designed to streamline the registration process for students, instructors, and courses. The platform includes seamless integration with a curated list of technologies to enhance the learning experience.

- Microservices developed using Java Spring with a hexagonal architecture and frontend built using Angular and atomic design methodology.
- Design of a scalable and robust architecture to support bootcamp management. 

## Technologies Used
- Java Spring
- Angular
- MySQL

## Architectural Patterns
- Hexagonal Architecture
- Atomic Design
`,
  },
  {
    name: "Forward Chaining Inference Engine API",
    slug: "forward-chaining-inference-engine-api",
    image:
      "https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/1_forward-chaining-vs-backward-chaining.png",
    content: `# Forward Chaining Inference Engine API

Implemented a forward chaining inference engine, designed to facilitate logical reasoning and decision-making processes within a Java Spring API environment. Created an API that can infer outcomes from given data and rules, improving the API's performance and logic. I enhanced the API's functionality by smoothly incorporating a forward chaining inference engine, which enables faster and smarter reasoning and creates a more adaptive system.

## Technologies Used
- Java Spring
`,
  },
];
