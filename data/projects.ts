export interface Project {
    name: string;
    slug: string;
    image: string;
    content: string;
}

export const projects: Project[] = [
    {
        name: 'Project 1',
        slug: 'project-1',
        image: 'https://nachokai.github.io/rpg-cv/img/ifytops.png',
        content: `# Project 1

This is a sample project demonstrating my backend development skills.

## Technologies Used
- Node.js
- Express
- MongoDB

## Features
- RESTful API
- Authentication and Authorization
- Data Validation`
    },
    {
        name: 'Project 2',
        slug: 'project-2',
        image: 'https://nachokai.github.io/rpg-cv/img/ifytops.png',
        content: `# Project 2

Another example project showcasing different backend technologies.

## Technologies Used
- Python
- Django
- PostgreSQL

## Features
- GraphQL API
- Real-time WebSocket Communication
- Caching with Redis`
    },
    {
        name: 'Project 3',
        slug: 'project-3',
        image: 'https://nachokai.github.io/rpg-cv/img/ifytops.png',
        content: `# Project 3
        
A third project to show my full-stack development skills.

## Technologies Used
- React
- Node.js
- MongoDB

## Features
- Server-side rendering
- Responsive Design

`
    }
]