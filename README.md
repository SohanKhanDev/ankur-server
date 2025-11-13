# 🌾 Ankur: Farmer's Growth & Connection Platform

## 🔗 Live Site

**Cultivate your network. Connect directly. Start growing with Ankur!**

[https://ankur-48a58.firebaseapp.com/]

---

## ✨ Project Overview

**Ankur** (meaning "sprout" or "seedling") is a modern, full-stack web application that serves as a **Social Agro Network**. It is specifically designed to bypass traditional e-commerce models by connecting people in the agricultural sector—farmers, traders, and consumers—in one transparent digital space. The focus is on fostering direct interaction, collaboration, and mutual growth.

## 🚀 Key Features & Technology Stack

Ankur is built as a highly responsive Single-Page Application (SPA) using a robust MERN-stack architecture enhanced by modern development tools.

* **Direct Social Agro Network:** Built with **React** and **Express.js**, the platform enables direct, peer-to-peer interaction. Users can post their crops and use the **'Show Interest to Connect'** feature, fostering relationship-based trade over simple transactions.
* **Secure & Seamless Authentication:** User registration and login, including social sign-in via Google, is managed securely using **Firebase Authentication**. Private routes ensure logged-in users are protected and maintain session integrity, even upon page reload.
* **Intuitive Crop Management (CRUD):** Users have full control over their inventory. The **Add Crop** and **My Posts** pages leverage **MongoDB** (via **Express.js** endpoints) to allow owners to create, read, update, and delete their agricultural listings.
* **Advanced Interest Tracking and Negotiation:** The **My Interests** and **Crop Details** pages provide a core feature: Owners can **Accept/Reject** incoming interest requests. This action instantly updates the status (stored in **MongoDB**) and, upon acceptance, automatically **reduces the crop's remaining quantity**—a complex, real-world business logic implemented on the server-side.
* **Responsive and Animated Design:** The website is styled using **Tailwind CSS** and **DaisyUI**, integrated with advanced packages like **AOS** and **Lottie** for smooth scroll animations and engaging visual elements.

---

## 🛠️ Technology Stack

Ankur is a full-stack application built with the MERN stack, ensuring high performance, modern design, and robust functionality.

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Frontend Foundation** | **HTML** & **CSS** | The core markup and styling foundation of the application. |
| **Frontend Framework** | **React** | For building a fast, component-based user interface. |
| **UI Framework** | **Tailwind CSS** & **DaisyUI** | For utility-first styling and beautiful, pre-built component logic. |
| **Authentication** | **Firebase** | For secure user registration, login, and Google sign-in. |
| **Backend (Server)** | **Node.js** & **Express.js** | For building the robust RESTful API and handling business logic. |
| **Database** | **MongoDB** | For flexible and scalable data storage and complex object handling (e.g., interests). |
| **Hosting** | **Firebase** (Client) & **Vercel** (Server) | For reliable and continuous application deployment. |

---

## 📦 Notable NPM Packages

### Client-Side Packages

These packages were used to enhance the user experience, design, and functionality of the application:

* `aos`: For **Scroll Animations** on elements to make the UI more dynamic.
* `lottie-react`: To seamlessly integrate engaging **Lottie animations** into various sections.
* `react-fast-marquee`: Used for creating smooth, fast-scrolling **Agro News/Blogs** tickers.
* `react-icons`: A comprehensive library for high-quality **vector icons**.
* `react-toastify`: For displaying non-intrusive **success/error/info messages** (as required, avoiding default alerts).
* `sweetalert2`: Used for creating custom, stylish **confirmation modals** (e.g., for interest submission or delete actions).
* `swiper`: For the fully-featured, responsive **Hero Section slider**.

### Server-Side Packages

These core packages power the backend API and database connection:

* `cors`: Essential for enabling Cross-Origin Resource Sharing, allowing the frontend to securely communicate with the API.
* `dotenv`: For securely loading environment variables (like the MongoDB URI) from a `.env` file.
* `express`: The fast, unopinionated, minimalist web framework for building the server and routing.
* `mongodb`: The official driver for connecting to and interacting with the MongoDB database.

---

## 👨‍💻 Project Structure (GitHub Repositories)

| Repository | Description | Status |
| :--- | :--- | :--- |
| **Client-Side** | Contains the React application code. | [https://github.com/SohanKhanDev/ankur] |
| **Server-Side** | Contains the Node.js/Express.js API code. | [https://github.com/SohanKhanDev/ankur-server] |
