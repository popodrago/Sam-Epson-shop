# SAM EPSON Shop (`Sam-Epson-shop`)

Premier printer electronic components and replacement parts store for Epson, Brother, and HP systems. Built with React, TypeScript, Tailwind CSS, and Firebase.

---

## 🚀 How to Deploy to GitHub (`Sam-Epson-shop`)

### Step 1: Create a Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new).
2. Set **Repository name** to: `Sam-Epson-shop`
3. Keep it **Public** or **Private**.
4. Do **NOT** initialize with a README, `.gitignore`, or License (your workspace already includes them).
5. Click **Create repository**.

---

### Step 2: Push Your Project Code to GitHub

Open your local terminal in this project folder and run the following commands:

```bash
# 1. Initialize git repository (if not already initialized)
git init

# 2. Add all files to staging
git add .

# 3. Commit your changes
git commit -m "Initial commit for Sam-Epson-shop"

# 4. Rename current branch to main
git branch -M main

# 5. Connect to your new GitHub repository (replace YOUR_GITHUB_USERNAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Sam-Epson-shop.git

# 6. Push code to the main branch
git push -u origin main
```

---

### Step 3: Enable Automatic GitHub Pages Deployment

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Go to your repository on GitHub: `https://github.com/YOUR_GITHUB_USERNAME/Sam-Epson-shop`
2. Click on **Settings** (top menu).
3. Select **Pages** from the left sidebar menu under *Code and automation*.
4. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
5. Save settings. 

Every time you push new code or updates to the `main` branch, GitHub Actions will automatically compile and publish your app live to:
`https://YOUR_GITHUB_USERNAME.github.io/Sam-Epson-shop/`

---

## ⚡ Alternative One-Click Deployments

### Option A: Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import `Sam-Epson-shop` from your GitHub account.
4. Keep framework preset as **Vite**.
5. Click **Deploy**.

### Option B: Netlify
1. Log in to [Netlify](https://netlify.com).
2. Click **Add new site** -> **Import an existing project**.
3. Choose **GitHub** and select `Sam-Epson-shop`.
4. Build settings auto-detect: Build command `npm run build`, publish directory `dist`.
5. Click **Deploy Sam-Epson-shop**.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript Linter
npm run lint

# Build production bundle
npm run build
```
