# 🛍️ Prestora E-commerce

[![Angular](https://img.shields.io/badge/Angular-20+-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://prestora.vercel.app)

A modern, modular, and scalable **e-commerce web app** built with **Angular**, **Tailwind CSS**, and **TypeScript** — providing a foundation for rich online store experiences.

> Live Demo: [https://prestora.vercel.app](https://prestora.vercel.app)

---

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🧩 About

**Prestora** is a feature-rich, modular e-commerce front-end powered by Angular.  
It focuses on performance, scalability, and reusability — built with clean architecture principles and a flexible UI powered by TailwindCSS.

This repository contains the **frontend** application only.

---

## 🚀 Features

### 🛍 Core E-commerce
- 🧱 **Modular Angular architecture** with lazy loading  
- 🧩 **Product listing** and **product details** pages  
- 🔍 **Product filtering by brand** using a custom `brandsFilter` pipe  
- ❤️ **Wishlist management**  
- 🛒 **Shopping cart system** with reactive state management (Angular signals)  
- 🧾 **Brand and category management** via services  
- 🧭 **Routing & navigation guards** for protected routes  
- 📦 **Data resolvers** for prefetching API data before route activation  
- 🧑‍💻 **Dynamic templates** with content injection and reusable UI components  
- 💬 **Custom ngx-spinner** templates with advanced loading animations  
- 🖼 **Image placeholders and fallback handling**  
- 💡 **Environment-based configuration** (`environment.ts`, `environment.prod.ts`)  

### 💅 User Experience
- 📱 **Responsive design** optimized for mobile and desktop  
- 🎨 **Full theming support** via a dedicated `themes/` directory  
- 🌙 **Dark/light theme ready** (extendable)  
- ⚡ **Smooth animations & transitions** using Tailwind and Angular features  
- 🔤 **Global typography and consistent design tokens**

### ⚙️ Developer & Build Features
- 🧰 **Angular 20+** with strict TypeScript configuration  
- 🧪 **Karma unit testing** setup  
- 🧹 **ESLint & EditorConfig** for code quality and formatting consistency  
- 🌀 **TailwindCSS 3.x** integrated with Angular build system  
- 🧱 **PostCSS configuration** for styling pipeline  
- 🔄 **HTTP Interceptors** for request management and API headers  
- 🧵 **Reactive Forms** with validation  
- 🧮 **Signals and computed signals** for reactive data flow  
- 🚀 **Vercel deployment ready**  
- 🧾 **Environment-specific builds** (Dev / Prod)  
- 🧱 **Component-based architecture** with reusable UI blocks

---

## 🧠 Tech Stack

| Layer                | Technology |
|----------------------|-------------|
| **Framework**        | Angular 20+ |
| **Language**         | TypeScript |
| **Styling**          | TailwindCSS / SCSS |
| **Build Tools**      | Angular CLI |
| **Testing**          | Karma / Jasmine |
| **Deployment**       | Vercel |
| **State Management** | Angular Signals |
| **Linting**          | ESLint |

---

## 🗂 Project Structure

```bash
Prestora-Ecommerce/
├── src/
│   ├── app/                # Angular modules, components, services
│   ├── assets/             # Images, icons, and style resources
│   ├── core/               # Core services (brands, products, etc.)
│   ├── shared/             # Shared UI components and pipes
│   ├── environments/       # Environment configs (dev, prod)
│   └── styles/             # Global styles and Tailwind setup
├── themes/                 # Theming support (light/dark)
├── angular.json            # Angular CLI configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript compiler options
└── README.md
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mark-Ehab/Prestora-Ecommerce.git
   cd Prestora-Ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

   Then visit [http://localhost:4200](http://localhost:4200).

4. **(Optional)** Update environment files under  
   `src/environments/` for custom API endpoints or settings.

---

## 💻 Usage

- Browse through product listings, brands, and details.
- Add or remove products from the cart and wishlist.
- Filter products dynamically by brand using the custom filter pipe.
- Switch or extend UI themes in the `/themes` directory.
- Modify styles easily through Tailwind’s utility classes.

---

## 🧪 Testing

Run the unit tests:

```bash
ng test
```

*(Uses Karma test runner and Jasmine test framework.)*

You can extend this setup with Cypress or Playwright for end-to-end testing.

---

## 📦 Build & Deployment

To generate a production build:

```bash
ng build --configuration production
```

Deploy the generated files from `dist/` to your server, or directly to **Vercel** or **Netlify**.

---

## 🤝 Contributing

Contributions are always welcome!  
Follow these steps to get started:

1. Fork the repository  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit changes:  
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your branch and open a pull request.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Angular CLI](https://angular.dev/cli)
- Styled with [TailwindCSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)
- Inspired by clean, modular e-commerce architectures

---

> **Prestora** — a modern foundation for scalable Angular e-commerce projects.
