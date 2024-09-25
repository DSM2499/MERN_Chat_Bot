# MERN Chat Bot

## Overview
This project is the result of my passion for exploring Large Language Models (LLMs) and improving my full-stack web development skills. The MERN Chat Bot is a web application that serves as an AI-powered personal assistant by leveraging OpenAI's GPT-3.5-turbo model. The application integrates the capabilities of OpenAI’s API within the MERN (MongoDB, Express, React, Node.js) stack to deliver a user-friendly chatbot experience.

## Features
- AI-powered Conversations: Enables real-time, intelligent conversation using OpenAI’s GPT-3.5-turbo model.
- User Authentication: Secured with JWT-based authentication and cookie management.
- Persistent Chat History: Stores chat history and user data securely in MongoDB.
- Responsive User Interface: Built with Material UI, ensuring a dynamic and intuitive user experience across devices.
- Optimized Backend Communication: Custom APIs and Axios streamline the communication between the backend and frontend.

## Technology Stack
- Frontend: React (Vite), Material UI
- Backend: Node.js, Express
- Database: MongoDB
- API Integration: OpenAI GPT-3.5-turbo
- Authentication: JWT, Cookies, bcrypt for password encryption

## Implemntation
**Backend:**
- **MongoDB** stores user data and chat history, ensuring persistent storage and easy retrieval of conversation logs.
- **Node.js** and **Express** handle the server-side logic, providing RESTful APIs for interaction between the frontend and backend.
- Authentication is implemented using **JWT (JSON Web Tokens)** and cookies for secure user sessions. User passwords are encrypted using bcrypt to enhance security.
- The backend interacts with OpenAI’s API to process user inputs and generate chatbot responses in real-time.

**Frontend:**
- The frontend is developed using React and optimized with the Vite build tool for faster development and better performance.
- Material UI components are used to create a modern, responsive interface that enhances user experience.
- Axios facilitates efficient communication between the frontend and backend, allowing for seamless data exchange.

**AI Integration:**
- The chatbot’s intelligence is powered by OpenAI’s GPT-3.5-turbo model, which handles the generation of responses based on user queries.
- The API integration allows the bot to offer natural language interactions, providing answers, suggestions, and assistance as needed.

**Key Security Features:**
- **JWT Authentication**: Secure token-based authentication ensures that only authorized users can access the application.
- **Password Encryption**: User passwords are stored securely after being hashed using bcrypt.
- **Session Management**: Cookies are used to maintain session data, ensuring a smooth user experience without compromising security.

## Future Enhancements
- **Role-based Access Control (RBAC):** Implementing roles for admin and regular users.
- **Customizable AI Model:** Allowing users to fine-tune chatbot behavior.
- **Mobile App:** Extending functionality to mobile platforms using React Native.

![](https://github.com/DSM2499/MERN_Chat_Bot/blob/main/Photos/Screenshot.png)
