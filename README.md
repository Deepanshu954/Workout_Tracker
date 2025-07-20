# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1f81324c-80e7-4a53-a1b8-ec5c823fe2f9

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1f81324c-80e7-4a53-a1b8-ec5c823fe2f9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1f81324c-80e7-4a53-a1b8-ec5c823fe2f9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Workout Tracker

A modern, full-featured fitness tracking web app built with React, Vite, Tailwind CSS, and Radix UI. Track your strength, cardio, weight, and nutrition progress with beautiful charts and a responsive, accessible UI.

## Features

- **Strength, Cardio, Weight, and Nutrition Tracking**
- **Interactive Charts** for progress visualization
- **Workout Plans** and templates
- **Responsive Design** for mobile and desktop
- **Modern UI** with Tailwind CSS and Radix UI components
- **Dark Mode** support

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (with custom design tokens)
- [Radix UI](https://www.radix-ui.com/) Primitives
- [Recharts](https://recharts.org/) for data visualization
- [Lucide Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Bun (if using bun.lockb) or npm/yarn/pnpm

### Installation

```sh
# Install dependencies
bun install # or npm install, yarn install, pnpm install
```

### Development

```sh
bun run dev # or npm run dev, yarn dev, pnpm dev
```

App will be available at [http://localhost:8080](http://localhost:8080)

### Build

```sh
bun run build # or npm run build, yarn build, pnpm build
```

## Project Structure

```
├── src/
│   ├── components/      # UI and feature components (dashboard, fitness, layout, ui)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Main app pages (Strength, Cardio, Weight, Dashboard, etc.)
│   └── types/           # TypeScript types
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind CSS config with custom tokens
├── vite.config.ts       # Vite config
├── package.json         # Project metadata and scripts
└── ...
```

## Customization

- **Design Tokens:** All colors, gradients, and shadows are defined in `src/index.css` using CSS variables for easy theming.
- **UI Components:** Built with Radix UI primitives and Tailwind for accessibility and flexibility.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

[MIT](LICENSE)
