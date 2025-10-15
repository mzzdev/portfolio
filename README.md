portfolio
<!-- # Portfolio Website

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

  **A modern, multilingual portfolio website built with Next.js 15 and the App Router**

  [View Demo](https://mzzdev.com) · [Report Bug](https://github.com/mzzdev/portfolio/issues) · [Request Feature](https://github.com/mzzdev/portfolio/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Project Structure](#-project-structure)
- [Internationalization](#-internationalization)
- [Docker](#-docker)
- [Contact Form](#-contact-form)
- [License](#-license)

---

## 🎯 About

This is a personal portfolio website designed to showcase web development projects, skills, and professional experience. Built with modern web technologies, it features a clean, responsive design with full internationalization support for multiple languages.

The site is optimized for performance, SEO, and user experience, leveraging the latest features of Next.js 15 including the App Router, Server Components, and React 19.

---

## ✨ Features

- **🌍 Multilingual Support**: Available in 6 languages (English, Spanish, German, French, Chinese, British English)
- **🎨 Modern UI/UX**: Clean, minimalist design with smooth animations using Framer Motion
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🚀 Performance Optimized**: Built with Next.js 15 App Router and React Server Components
- **♿ Accessible**: WCAG compliant with semantic HTML and ARIA labels
- **🌙 Dark Theme**: Professional dark color scheme
- **📬 Contact Form**: Integrated email functionality using Resend
- **🔍 SEO Optimized**: Meta tags, Open Graph, and structured data
- **🐳 Docker Ready**: Includes Docker configuration for easy deployment

---

## 🛠 Tech Stack

### Core
- **[Next.js 15.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.1](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 11](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives

### Internationalization
- **[next-intl 3.17](https://next-intl-docs.vercel.app/)** - Type-safe i18n for Next.js

### Email
- **[Resend 6.1](https://resend.com/)** - Modern email API

### Additional Tools
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Utility for merging Tailwind classes

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **pnpm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mzzdev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Resend API Key for contact form
   RESEND_API_KEY=your_resend_api_key_here
   
   # Email configuration
   CONTACT_EMAIL=your@email.com
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Localized routes
│   │   │   ├── layout.tsx         # Root layout with i18n
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── not-found.tsx      # 404 page
│   │   │   └── [...rest]/         # Catch-all route
│   │   └── api/
│   │       └── contact/           # Contact form API endpoint
│   │           └── route.ts
│   ├── components/
│   │   ├── ContactForm.tsx        # Contact form component
│   │   ├── Footer.tsx             # Site footer
│   │   ├── LanguageDetector.tsx   # Client-side language detection
│   │   ├── LanguageSelector.tsx   # Language switcher
│   │   ├── NavMenu.tsx            # Navigation menu
│   │   ├── ProjectCard.tsx        # Project display card
│   │   ├── ProjectCard.grid.tsx   # Project grid layout
│   │   ├── Section.tsx            # Page section wrapper
│   │   └── ui/                    # Reusable UI components
│   ├── data/
│   │   └── projects.ts            # Project data
│   ├── i18n/
│   │   ├── request.ts             # Server-side i18n
│   │   └── routing.ts             # i18n routing configuration
│   ├── lib/
│   │   ├── languageDetection.ts   # Language detection utilities
│   │   └── utils.ts               # General utilities
│   ├── styles/
│   │   └── globals.css            # Global styles
│   └── middleware.ts              # Next.js middleware for i18n
├── messages/                      # Translation files
│   ├── en-US.json
│   ├── en-GB.json
│   ├── es.json
│   ├── de.json
│   ├── fr.json
│   └── zh.json
├── public/
│   └── projects/                  # Project images and assets
├── docker-compose.yml             # Docker Compose configuration
├── Dockerfile                     # Docker image definition
├── next.config.mjs                # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

---

## 🌍 Internationalization

The portfolio supports 6 languages with automatic browser language detection:

| Language | Code | File |
|----------|------|------|
| English (US) | `en-US` | `messages/en-US.json` |
| English (UK) | `en-GB` | `messages/en-GB.json` |
| Spanish | `es` | `messages/es.json` |
| German | `de` | `messages/de.json` |
| French | `fr` | `messages/fr.json` |
| Chinese | `zh` | `messages/zh.json` |

### Adding a New Language

1. Create a new JSON file in the `messages/` directory (e.g., `messages/it.json`)
2. Copy the structure from `messages/en-US.json` and translate all values
3. Update `src/i18n/routing.ts` to include the new locale:
   ```typescript
   export const routing = defineRouting({
     locales: ['en-US', 'en-GB', 'es', 'de', 'fr', 'zh', 'it'],
     defaultLocale: 'en-US'
   });
   ```

### How It Works

- **Automatic Detection**: The middleware detects the user's browser language
- **URL-based**: Language is determined by the URL path (e.g., `/es/`, `/de/`)
- **Type-safe**: All translations are type-checked using TypeScript
- **Server & Client**: Works with both Server and Client Components

---

## 🐳 Docker

The project includes Docker configuration for easy deployment.

### Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop the container
docker-compose down
```

### Manual Docker Build

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio
```

---

## 📬 Contact Form

The contact form uses [Resend](https://resend.com/) to send emails. To set it up:

1. Create a free account at [resend.com](https://resend.com/)
2. Generate an API key
3. Add the API key to your `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CONTACT_EMAIL=your@email.com
   ```

The contact form includes:
- Client-side validation
- Server-side validation
- Rate limiting
- Error handling
- Success/error feedback
- Email regex validation

---

## 👨‍💻 Author

**Pablo Belló**
- Website: [mzzdev.com](https://mzzdev.com)
- GitHub: [@mzzdev](https://github.com/mzzdev)

---

## 📄 License

**© 2025 mzz - Pablo Belló. All rights reserved.**

This code is publicly available for viewing and evaluation purposes only. 
You may NOT:
- Copy, modify, or distribute this code
- Use this code for commercial purposes
- Use this code in your own projects

If you're interested in using any part of this project, please contact me.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">
  <p>Made with ❤️ by Pablo Belló</p>
  <p>© 2025 mzz - Pablo Belló. All rights reserved.</p>
</div> -->