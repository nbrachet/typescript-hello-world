# TypeScript Hello World

A simple TypeScript web application that displays "Hello World" in a browser, optimized for Vercel deployment.

## Project Structure

- `src/main.ts` - Main TypeScript application file
- `index.html` - HTML file that loads the compiled JavaScript
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment configuration
- `public/` - Compiled JavaScript output directory (created during build)
- `.gitignore` - Git ignore file

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the TypeScript code:
   ```bash
   npm run build
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```

   Or build and serve in one command:
   ```bash
   npm run start
   ```

The application will open automatically in your browser at `http://localhost:3000` and display "Hello World".

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript and copy HTML to public directory
- `npm run serve` - Start the live server
- `npm run start` - Build and serve the application
- `npm run dev` - Alias for start (build and serve)

## Deployment to Vercel

This project is configured for easy deployment to Vercel:

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy from the project directory:
   ```bash
   vercel
   ```

3. Follow the prompts to configure your deployment

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/typescript-hello-world.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and connect your GitHub account

3. Import your repository and deploy

### Vercel Configuration

The project includes a `vercel.json` file that:
- Sets the build command to `npm run build`
- Specifies the output directory as `public/`
- Configures the install command

Vercel will automatically:
1. Install dependencies with `npm install`
2. Build the project with `npm run build` (compiles TypeScript and copies HTML)
3. Serve the static files from the `public/` directory

### Live Demo

Once deployed, your TypeScript Hello World app will be available at your Vercel URL (e.g., `https://your-project-name.vercel.app`)
