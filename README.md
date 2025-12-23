# 🚀 Modern MERN Task Manager (Production-Ready)

A high-performance, containerized Task Management application built with the **MERN** stack. This project moves away from `create-react-app` in favor of **Vite** and uses **Docker** for seamless deployment.



---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), React Router, Axios, React-Toastify |
| **Backend** | Node.js, Express.js, Joi Validation |
| **Database** | MongoDB (via Mongoose) |
| **Authentication** | JWT with HttpOnly Cookies (Secure Session) |
| **Infrastructure** | Docker, Docker Compose, Nginx |

---

## ✨ Key Features

- **Vite Integration:** Optimized frontend build for superior speed.
- **Secure Authentication:** No LocalStorage for tokens; uses **HttpOnly Cookies** to prevent XSS attacks.
- **Full CRUD:** Support for creating, reading, updating (titles/descriptions), and deleting tasks.
- **Ownership Security:** Backend middleware ensures users can only access their own tasks.
- **Environment Isolation:** Fully dockerized services for frontend and backend.
