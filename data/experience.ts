export interface ProfessionalExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export const professionalExperience: ProfessionalExperience[] = [
  {
    role: 'Full-stack Developer',
    company: 'Wompi',
    duration: '03/2025 - Present',
    description: `*   Engineered complex financial features for payouts processing, open banking integrations, and POS transactions, ensuring secure and compliant data flow for over 40,000 merchants.
*   Developed high-performance backend services utilizing Node.js, TypeScript, NestJS, and Ruby to deliver scalable solutions.
*   Leveraged AI-driven development tools, including Cursor and Copilot, to optimize coding efficiency, accelerate feature delivery, and enhance code quality.
*   Architected responsive user interfaces using Vue, React, React Native, and Next.js to deliver dynamic web and mobile experiences.
*   Optimized the software lifecycle by implementing DevOps best practices, CI/CD pipelines, and Infrastructure as Code (IaC) via AWS (EKS, SQS, DynamoDB, S3).`
  },
  {
    role: 'Backend Developer',
    company: 'Pragma',
    duration: '07/2024 - 01/2025',
    description: `*   Reduced technical debt across 15+ microservices and lambdas, achieving 0 code smells and over 80% test coverage through hexagonal architecture and SOLID principles.
*   Optimized the Transer Backoffice freight value chain, enhancing APIs to achieve a 15% reduction in data processing time.
*   Streamlined salary review workflows in the Glori Application, ensuring secure and fair compensation processes for over 1,200 employees.
*   Accelerated professional development tools in the Creci Platform, supporting 1,200+ users with automated evaluations and growth map generation.`
  },
  {
    role: 'Backend Developer',
    company: 'PlayGreen',
    duration: '07/2023 - 11/2023',
    description: `*   Designed and implemented robust MySQL databases to handle over 50,000 daily transactions while ensuring data integrity and optimal performance.
*   Increased system throughput by 30% by integrating new backend functions using Node.js frameworks like NestJS and Hapi.
*   Developed and maintained 3+ RESTful APIs, effectively managing high-volume data flow between users and servers.`
  }
];
