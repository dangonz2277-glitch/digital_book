
# Expressive Models Architecture 📸

A high-performance, modular Digital Comp Card platform designed for professional models and agencies. 

## 🎯 The Vision
In the modeling industry, casting directors and scouts make decisions in seconds, often from mobile devices. Traditional PDF "books" are heavy and slow. This project solves that by providing an ultra-fast, SEO-optimized, and visually cinematic single-page application (SPA).

## 🚀 Tech Stack
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS (Utility-first for rapid, responsive design)
* **Language:** TypeScript (Strict typing for scalable data models)
* **Animation:** Framer Motion (Smooth, hardware-accelerated transitions)

## 🧠 Architectural Decisions
* **Data-Driven Design:** The UI components are completely decoupled from the model's data. A single `danney.ts` configuration file acts as the source of truth for all measurements, experience, and images. This allows the platform to be easily scaled into a "Productized Service" for multiple clients.
* **Performance First (Mobile First):** * Lazy loading implemented for gallery images to maintain optimal LCP (Largest Contentful Paint).
  * Strategic use of `WebP` formats.
  * Conditional rendering for heavy UI elements based on viewport size.

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/tu-usuario/tu-repo.git)

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
