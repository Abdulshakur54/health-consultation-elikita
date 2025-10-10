# 🩺 E-Likita Health Consultation Application

E-Likita is a modern **Health Consultation Web Application** designed to provide users with a seamless way to register, log in, and request health consultations with ease. It features secure authentication, responsive design, cloud-based image uploads, and robust backend functionality.

---

## 🚀 Live Demo

- **Frontend (Netlify):** [https://health-consultation.netlify.app/](https://health-consultation.netlify.app/)
- **Backend (Render):** [https://health-consultation-elikita.onrender.com/](https://health-consultation-elikita.onrender.com/)

---

## 🧠 Features

### 👩‍⚕️ User Features
- User registration and login (JWT authentication)
- Profile management with Cloudinary image uploads
- Submit and track health consultations
- View detailed consultation records
- “Contact Us” form with integrated email sending and **reCAPTCHA (“I am not a robot”) verification**
- Responsive UI with Tailwind CSS and ShadCN components

### 🔒 Security Features
- JWT-based Authentication using **HttpOnly cookies**
- CSRF and XSS protection with trusted Node.js modules
- Password hashing and salting with **bcrypt.js**
- Implemented CORS policy for secure API access
- Rate limiting to prevent abuse

### ⚙️ Backend Features
- RESTful API built with **Express.js**
- MongoDB Atlas database for scalable data storage
- Image upload and management via **Cloudinary**
- Input validation using **Yup**
- Multer for secure file upload handling
- Modular and well-structured codebase

### 🎨 Frontend Features
- Built with **React (TypeScript)** for a responsive SPA experience
- Navigation handled via **React Router DOM**
- **Formik + Yup** for form handling and validation
- **TailwindCSS** for modern and responsive styling
- **ShadCN UI** for prebuilt elegant components
- **Font Awesome Icons** for visual and interactive enhancements

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React (TypeScript), TailwindCSS, Formik, Yup, React Router DOM, ShadCN, Font Awesome |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | JWT, bcrypt.js |
| **File Uploads** | Multer, Cloudinary |
| **Security** | CSRF, XSS, CORS, Helmet, Rate Limiting |
| **Validation** | Yup |
| **Deployment** | Netlify (Frontend), Render (Backend) |

---

## 🧑‍💻 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Abdulshakur54/health-consultation.git
cd health-consultation
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend` with the following variables:
```env
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

Run the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Then open your browser and visit:
```
http://localhost:5173
```

---

## 🧪 API Documentation

Comprehensive API documentation is available via Swagger.

Once your server is running locally, visit:
```
http://localhost:5000/api-docs
```

---

## 📬 Contact

If you’d like to connect, collaborate, or reach out for support, feel free to contact me through the following channels:

- **GitHub:** [https://github.com/Abdulshakur54](https://github.com/Abdulshakur54)
- **LinkedIn:** [https://www.linkedin.com/in/abdulshakurmuhammed/](https://www.linkedin.com/in/abdulshakurmuhammed/)
- **Email:** yourname@example.com

The platform also includes a built-in **Contact Form** allowing visitors to send emails directly, secured with **Google reCAPTCHA** (“I am not a robot”) verification.

---

## 🏗️ Folder Structure
```
E-Likita/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── lib/
│   ├── swagger/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── assets/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🏆 Author

**👨‍💻 Abdulshakur Muhammed**  
A passionate full-stack developer focused on building secure, scalable, and user-friendly web applications.

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute with attribution.
