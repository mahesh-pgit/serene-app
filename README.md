# 🍁 Serene | A Calm & Personal Kanban-Inspired Task Board

**Serene** is a beautifully crafted, personal, kanban-inspired task board designed to help individuals plan, reflect, and progress with peace — without the clutter or pressure of traditional project management tools.

Inspired by the visual style of Kanban, but adapted for flexible, everyday use, Serene helps you organize your thoughts — from shopping lists to life goals — in a calm, focused space.

> Peaceful productivity meets elegant simplicity.

## 📸 Demo

Live Preview: 👉 [Check it out on Vercel](https://serene.vercel.app)

## 🧩 Features

-   🗂️ **Visual Board Organization** — Create boards, add lists, and manage task cards.

    -   Boards – Create, rename, or delete board(s).
    -   Lists (Columns) – Add, rename, or delete list columns to structure tasks.
    -   Task Cards – Add, edit, or remove cards. Mark tasks as complete/incomplete.

-   🔀 **Drag & Drop Everything**

    -   Move tasks across lists or within the same list.
    -   Rearrange lists within a board.
    -   Reorder boards in the sidebar.

-   🌈 **Background Themes** – Choose from soothing gradients & soft images.

-   📄 **Customizable Templates** — Pre-built boards for weekly planning, shopping, productivity, and more.

-   💾 **Persistent Storage** — Automatically saves all your data in `localStorage`.

-   🔔 **Toast Notifications** — Smooth, stackable toasts that provide feedback for all key interactions.

-   👋 **Onboarding Experience** — Welcomes new users with clarity and simplicity.

-   📱 **Responsive Design** — Fully mobile-compatible and touch-friendly.

-   💅 **Zero Dependency Overload** – Lightweight, fast, and built entirely with React and vanilla JavaScript, without relying on external libraries.

## 📦 Tech Stack

-   ⚛️ **React** (Functional Components + Hooks)

-   ⚡ **Vite** – Fast build tool for modern web apps

-   📂 **Context API** – Global state for Boards, Themes, and Toasts

-   🧠 **Custom Hooks** – `useLocalStorage`, `useSessionStorage`

-   💅 **TailwindCSS** – Modular and responsive styling

-   🖼️ **Custom SVGs** – Lightweight icons, no extra libraries

-   🪄 **Local Storage** – All state lives in the browser; no backend needed

## 📁 Project Structure

```bash
serene-app/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # SVG icons & background images
│   ├── components/
│   │   ├── board/              # Board-related components (Header, Sidebar)
│   │   ├── list/               # List column components
│   │   └── task/               # Task card components
│   ├── contexts/               # React Contexts for app state
│   ├── hooks/                  # Custom storage hooks
│   ├── layouts/                # App layouts & onboarding flow
│   ├── styles/                 # Global styling
│   ├── templates/              # Pre-built board templates
│   ├── App.jsx                 # Root component
│   └── index.jsx               # App entry point
├── index.html                  # HTML shell
├── package.json                # Project config
└── vite.config.js              # Vite config
```

## 🧠 Why Serene?

While traditional Kanban boards are built for teams and workflows, **Serene** was designed for individuals seeking a peaceful, flexible space to stay organized.

> “A calm place to plan, reflect, and grow — your thoughts, your way.”

Serene follows the **visual structure** of a Kanban board — with boards, lists, and draggable cards — but it doesn’t enforce rigid workflows or team-based metrics. It’s more like:

> 🧘 Kanban + Notion + Zen = 🍁 Serene

Use Serene to:

-   Organize your shopping list 🛒
-   Plan content ideas ✍️
-   Track weekly goals 📅
-   Brain-dump thoughts or intentions 🌱

> Serene is a digital sanctuary for your thoughts.

## 🧪 Getting Started

```bash
git clone https://github.com/mahesh-pgit/serene-app.git
cd serene-app
npm install
npm start
```

The app will open at `http://localhost:5173`

To build for production:

```bash
npm run build
npm run preview
```

Open in browser: `http://localhost:4173`

## 🎁 Templates Included

Quick-start your workflow with built-in templates:

-   🗓️ Weekly Planner
-   🛍️ Shopping List
-   💪 Personal Productivity
-   💻 Project Management
-   📱 Content Creation
-   📋 General To-Do Board
-   📊 Short-Term Tracker

All templates are stored as preloaded `.js` files in `/src/templates`.

## 💡 Customization Tips

-   🖌 Replace or add backgrounds via `/src/assets/backgrounds`

-   🧱 Add custom board templates in `/src/templates`

-   ☁️ Integrate Firebase/Supabase for cloud sync

-   🌘 Add dark mode using CSS variables and toggles

## 🛣️ Roadmap

-   🌙 Dark mode support

-   ☁️ Firebase sync

-   📝 Markdown support in tasks

-   🌍 Shareable board URLs

-   📤 Export/Import board data (JSON)

## 🤝 Contributing

Pull requests are welcome! Let's keep Serene clean, elegant, and user-first. ✨

1. Fork this repo

2. Create a new branch: `git checkout -b feature/feature-name`

3. Commit your changes: `git commit -am 'Add feature'`

4. Push and open a PR

## 🧑‍💻 Author

Built with 💚 by [Mahesh](https://github.com/mahesh-pgit)

A passionate React developer focused on building clean and mindful user interfaces.

## ✅ Built From Scratch

This project was developed entirely by me, without any templates, libraries, or starter kits. All code, structure, and logic are 100% original.

> Serene isn’t just an app.  
> It’s a peaceful workspace for your inner world.
