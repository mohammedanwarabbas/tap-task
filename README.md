# 🚀 Tap Task - Lead Management Dashboard

A modern, responsive lead management dashboard built for Gettap.co interview assignment. Fully matches with the figma design. Features a clean UI with real-time data handling and export capabilities.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-000?logo=zustand)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.0.4-000?logo=react)


## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/mohammedanwarabbas/tap-task.git
cd tap-task
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in Browser**
   Navigate to http://localhost:5173

## 🚀 Build for Production

```bash
# Build the application
npm run build
# Preview the production build
npm run preview
```


## ✨ Features

- 📊 **Lead Management** - View and manage leads from JSONPlaceholder API
- 🔍 **Search & Filter** - Real-time search and tag-based filtering
- 📱 **Responsive Design** - Optimized for desktop and mobile
- 📤 **CSV Export** - Export filtered data to CSV files
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite and React 19
- 🏪 **State Management** - Zustand for efficient state handling


## 🛠️ Tech Stack

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| **React 19**     | UI Framework            |
| **TypeScript**   | Type Safety             |
| **Vite**         | Build Tool & Dev Server |
| **Tailwind CSS** | Styling & Design System |
| **shadcn/ui**    | UI Components           |
| **Zustand**      | State Management        |
| **Lucide React** | Icons                   |


### 📁 Project Structure

```
.
|
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── images
│   │       ├── avatar-3.png
│   │       ├── sophia-avatar-1.png
│   │       ├── sophia-avatar-2.png
│   │       ├── synergy-logo.png
│   │       ├── team-member-avatar-1.png
│   │       ├── team-member-avatar-2.png
│   │       └── team-member-avatar-3.png
│   ├── components
│   │   ├── layout
│   │   │   └── Sidebar.tsx
│   │   └── ui
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── ExportIcon.tsx
│   │       ├── HubspotIcon.tsx
│   │       ├── input.tsx
│   │       ├── PipedriveIcon.tsx
│   │       ├── skeleton.tsx
│   │       ├── ThreeUsersIcon.tsx
│   │       └── ZapierIcon.tsx
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   └── Dashboard.tsx
│   ├── store
│   │   └── leadStore.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```
