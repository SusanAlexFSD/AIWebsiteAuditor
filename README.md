# 🔍 AI Website Auditor

A full-stack website auditing application built with **Next.js, TypeScript, Tailwind CSS and Playwright**.

The application allows a user to submit a website URL and analyse the site programmatically, collecting information about the website and presenting the results through a structured dashboard.

The project combines web crawling, website analysis, API routes, database tooling and a modern React/Next.js interface.

---

## 🚀 Overview

AI Website Auditor was built to explore how automated website analysis can be used to identify and present useful information about a website.

The application accepts a website URL, validates it and uses a crawling service to access the site and collect audit information.

The results can then be presented through the application's audit and dashboard interfaces.

---

## ✨ Key Features

* Website URL validation
* Automated website crawling
* Website audit functionality
* Page title extraction
* Meta description extraction
* Link counting
* Image counting
* Audit results interface
* Dashboard components
* Audit history functionality
* AI-related application components
* Structured API routes
* Database integration/configuration

---

## 🛠️ Technology Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend / Application

* **Next.js App Router**
* **TypeScript**
* API routes
* Server-side functionality

### Web Crawling & Auditing

* **Playwright**
* Website crawling
* Automated page analysis

### Database

* **Prisma**
* Database schema/configuration

### Development

* ESLint
* Git
* GitHub
* Environment variables

---

## 🏗️ Application Structure

The project uses a Next.js App Router structure.

```text
ai-website-auditor/
│
├── app/
│   ├── api/
│   ├── history/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AI/
│   ├── Audit/
│   ├── Dashboard/
│   ├── Forms/
│   ├── Layout/
│   └── UI/
│
├── docs/
├── lib/
├── prisma/
├── public/
├── services/
├── types/
│
├── crawler-api/
│
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔌 API

The application includes an API endpoint for processing website audits:

```text
/api/audit
```

The audit process validates the submitted URL before passing it to the website crawling functionality.

The general flow is:

```text
Website URL
     ↓
URL Validation
     ↓
Audit API
     ↓
Website Crawler
     ↓
Playwright
     ↓
Website Analysis
     ↓
Audit Results
     ↓
Dashboard / UI
```

---

## 🕷️ Website Crawling

Playwright is used to automate access to websites during the auditing process.

The crawler collects information from the target website, including:

* Page title
* Meta description
* Number of links
* Number of images

The crawler is designed to handle websites that may take time to respond, with error handling around navigation and page access.

---

## 🧪 Auditing & Error Handling

One of the main development challenges in this project was making website crawling reliable.

During development, I worked through issues including:

* Navigation timeouts
* Websites that could not be resolved
* `net::ERR_NAME_NOT_RESOLVED`
* Different website response behaviour
* Handling failed crawl attempts
* Validating URLs before attempting a crawl

The crawler was adjusted to use appropriate Playwright navigation settings and error handling so that failed website requests could be handled without bringing down the application.

---

## 🧩 Component Architecture

The application uses a component-based structure with dedicated areas for different parts of the interface.

```text
components/
├── AI/
├── Audit/
├── Dashboard/
├── Forms/
├── Layout/
└── UI/
```

This separates reusable interface elements from the application's audit, dashboard, form and AI-related functionality.

---

## 🗄️ Database

The project includes **Prisma** database tooling and configuration.

```text
prisma/
```

Prisma is used as the database access layer within the application architecture.

The project also includes functionality for audit history, allowing the application to work with stored audit information.

---

## 📊 Audit History

The application includes a dedicated history area:

```text
app/history/
```

This provides a separate area for working with previous audit information rather than treating each audit as an isolated request.

---

## 🤖 AI Components

The application includes a dedicated AI component area:

```text
components/AI/
```

This reflects the project's focus on combining automated website auditing with AI-related functionality.

---

## 📸 Screenshots

Screenshots can be added here to showcase the application's main interfaces.

### Dashboard

![Dashboard](./docs/screenshots/Auditor1.png)

### Audit Interface

![AI Website Auditor](./docs/screenshots/Auditor3.png)

### Audit Results

![Audit Results](./docs/screenshots/Auditor2.png)

### Audit Results

![Audit Results](./docs/screenshots/Auditor3.png)

### Audit Results

![Audit Results](./docs/screenshots/Auditor4.png)

### AI Audit

![Audit Results](./docs/screenshots/Auditor5.png)

---

## 💻 Local Development

Install the project dependencies:

```bash
npm install
```

Create the required environment variables in your local environment.

Run the development server:

```bash
npm run dev
```

The application can then be accessed through the local Next.js development server.

Because the application performs website crawling, the relevant Playwright/browser dependencies also need to be available in the development environment.

---

## 🔐 Environment Variables

The project uses environment configuration files for local and development environments.

Sensitive values such as API keys, database connection strings and other credentials should be kept in environment variables and **not committed to GitHub**.

The repository contains:

```text
.env
.env.local
```

These should contain local configuration rather than publicly exposed credentials.

---

## 📚 What This Project Demonstrates

This project demonstrates practical experience with:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Next.js App Router
* API development
* Playwright
* Automated website crawling
* Website data extraction
* URL validation
* Error handling
* Prisma
* Component-based architecture
* Database-backed application functionality
* Git and GitHub
* Environment configuration

---

## 🧠 Problem Solving

A key part of developing this application was dealing with the unpredictability of crawling external websites.

Unlike working with a controlled database or API, external websites can:

* Respond slowly
* Fail to resolve
* Reject requests
* Contain different page structures
* Take longer than expected to load

I therefore worked on validation, timeout handling and error handling around the crawling process.

This provided practical experience with building applications that interact with external systems where failures cannot always be controlled by the application itself.

---

## 🎯 Project Purpose

The purpose of AI Website Auditor was to build a practical application that combines:

**Next.js + TypeScript + automated web crawling + website analysis + database functionality + AI-related features**

The project demonstrates my ability to work beyond basic frontend development and build applications involving external data, automation and backend processing.

---

## 📌 Project Status

**Portfolio project — active development**

The application continues to be developed and refined as part of my full-stack development portfolio.

---

## 👩‍💻 About Me

I'm a self-taught full-stack web developer with a background in project management and telecommunications.

My development work focuses on building practical applications and developing skills across **React, JavaScript, TypeScript, Next.js, Node.js, APIs, databases, automation and cloud technologies**.

This project forms part of my portfolio demonstrating my progression into modern full-stack development.

---

## 🔗 Links

**Live Demo:** https://ai-websiteauditor-urpu.vercel.app

**GitHub:** https://github.com/SusanAlexFSD/AIWebsiteAuditor
