# How to Deploy Your Portfolio Site

This guide walks you through getting your portfolio site live on the internet. You'll go from zero to a working site at your own domain. No prior experience with any of these tools is needed.

The process has four parts:

1. Install the tools you need
2. Push the code to GitHub
3. Deploy to Vercel
4. Connect your domain


---

## Part 1: Install the Tools

You need two things on your computer: Node.js and Git.

### Install Node.js

Node.js is what runs the code locally and builds the site for production.

1. Go to https://nodejs.org
2. Download the LTS version (the one on the left that says "Recommended for Most Users")
3. Run the installer and accept all the defaults
4. To confirm it worked, open Terminal (Mac) or Command Prompt (Windows) and type:

```
node --version
```

You should see a version number like v20.x.x. If you do, you're good.

### Install Git

Git is what tracks your code and lets you upload it to GitHub.

**Mac:** Git is usually already installed. Open Terminal and type:

```
git --version
```

If it's not installed, it will prompt you to install the Xcode command line tools. Click "Install" and wait.

**Windows:** Go to https://git-scm.com/download/win and download the installer. Run it and accept all the defaults.


---

## Part 2: Set Up the Project Locally

### 2a. Unzip the project

I've provided a zip file called `gabe-portfolio.zip`. Unzip it somewhere you can find it easily - your Desktop or Documents folder works fine.

You should see a folder called `gabe-portfolio` with these files inside:

```
gabe-portfolio/
  index.html
  package.json
  vite.config.js
  .gitignore
  README.md
  public/
    logo.png
  src/
    main.jsx
    App.jsx
    Portfolio.jsx
```

### 2b. Install project dependencies

Open Terminal (Mac) or Command Prompt (Windows).

Navigate to the project folder. If you put it on your Desktop, the command would be:

**Mac:**
```
cd ~/Desktop/gabe-portfolio
```

**Windows:**
```
cd C:\Users\YourName\Desktop\gabe-portfolio
```

Then run:

```
npm install
```

This will take a minute. It downloads all the libraries the project needs and creates a `node_modules` folder. You don't need to touch anything in that folder.

### 2c. Test it locally (optional but recommended)

While you're still in that Terminal window, run:

```
npm run dev
```

You'll see a message like:

```
Local: http://localhost:5173/
```

Open that URL in your browser. You should see your portfolio site running locally. Press Ctrl+C in Terminal to stop the server when you're done looking.


---

## Part 3: Push to GitHub

### 3a. Create a GitHub account

1. Go to https://github.com
2. Click "Sign up"
3. Use your personal email and create a username
4. Verify your email

### 3b. Create a new repository

1. Once logged in, click the "+" icon in the top right corner
2. Click "New repository"
3. Name it `gabe-portfolio`
4. Keep it set to "Public" (Vercel needs to see it)
5. Do NOT check "Add a README file" (we already have one)
6. Do NOT select a .gitignore template (we already have one)
7. Click "Create repository"

You'll land on a page with setup instructions. Keep this page open - you'll need the URL it shows you.

### 3c. Push your code

Go back to Terminal. Make sure you're still in the `gabe-portfolio` folder. Run these commands one at a time:

```
git init
```

This creates a new Git project in the folder.

```
git add .
```

This tells Git to track all the files.

```
git commit -m "Initial commit"
```

This saves a snapshot of your code.

Now connect it to GitHub. Replace YOUR-USERNAME with your actual GitHub username:

```
git remote add origin https://github.com/YOUR-USERNAME/gabe-portfolio.git
```

```
git branch -M main
```

```
git push -u origin main
```

GitHub will ask for your username and password. For the password, you'll need to use a Personal Access Token instead of your regular password.

### 3d. Create a Personal Access Token (if prompted for password)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" then "Generate new token (classic)"
3. Give it a name like "Portfolio deployment"
4. Set expiration to 90 days
5. Check the box next to "repo" (this gives it permission to push code)
6. Click "Generate token"
7. Copy the token immediately - you won't see it again
8. Paste that token when Terminal asks for your password

After the push succeeds, go back to your GitHub repository page and refresh. You should see all your files listed there.


---

## Part 4: Deploy to Vercel

### 4a. Create a Vercel account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 4b. Import your project

1. On the Vercel dashboard, click "Add New..." then "Project"
2. You should see your `gabe-portfolio` repository listed
3. Click "Import" next to it
4. On the configuration screen, everything should be auto-detected:
   - Framework Preset: Vite
   - Build Command: `npm run build` (or `vite build`)
   - Output Directory: `dist`
5. Click "Deploy"

Vercel will build and deploy your site. This takes about 30-60 seconds.

When it's done, you'll see a success screen with a URL like:

```
https://gabe-portfolio-xxxxx.vercel.app
```

Click that URL. Your portfolio is now live on the internet.

### 4c. Connect your custom domain

1. In Vercel, go to your project settings
2. Click "Domains"
3. Type in `gabeperea.me` and click "Add"
4. Vercel will show you DNS records to add

You'll need to go to wherever you manage your domain (GoDaddy, Namecheap, Cloudflare, etc.) and update the DNS settings:

**Option A - If Vercel tells you to add an A record:**
- Type: A
- Name: @ (or leave blank)
- Value: 76.76.21.21

**Option B - If Vercel tells you to add a CNAME:**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

You'll typically want to set up both the root domain (gabeperea.me) and the www version (www.gabeperea.me).

DNS changes can take anywhere from a few minutes to 48 hours to propagate. In practice, it's usually under 30 minutes.

Once the DNS is connected, Vercel automatically gives you a free SSL certificate, so your site will work with https.


---

## How to Make Changes Later

This is the best part. Whenever you want to update your site, the process is:

1. Edit `src/Portfolio.jsx` in any text editor (VS Code is free and great for this: https://code.visualstudio.com)
2. Open Terminal, navigate to the project folder
3. Run these three commands:

```
git add .
git commit -m "Updated case studies"
git push
```

Vercel automatically detects the push and rebuilds your site. Your changes will be live within about 60 seconds.


---

## Where to Edit Content

All of your site's content lives in one file: `src/Portfolio.jsx`

Here's what to edit for each type of change:

**Case studies:** Find the `caseStudies` array near the top of the file. Each case study has a tag, title, challenge, actions, and results. Add, remove, or edit entries as needed.

**Tools list:** Find the `tools` array. Just add or remove strings.

**Specialties:** Find the `specialties` array. Same deal.

**Career history:** Find the `career` array. Each entry has a period, role, company, and optional note.

**About section copy:** Search for "I'm a senior paid search strategist" - that's where the bio paragraphs start. Edit the text directly.

**Hero headline and subtext:** Search for "I turn paid search" - that's the hero. Edit the text inside the JSX tags.

**Contact email:** Search for "gabe@gabeperea.me" and update if needed.

**Logo:** Replace `public/logo.png` with a new image file. Ideally use a transparent-background PNG of your GP monogram. The current version has a black background - a transparent version will look cleaner.

**Colors:** The brand colors are defined as constants at the very top of the file (NAVY, GOLD, etc.). Change those values to update colors site-wide.


---

## Logo Note

Your current GP-Logo.png has a black background. It works fine at small sizes in the nav (reads like a dark badge), but a version with a transparent background would look more polished. If you have access to the original design file (Illustrator, Figma, Canva, etc.), export the monogram as a PNG with no background and drop it into `public/logo.png`.


---

## Quick Reference

| Task | Command |
|------|---------|
| Run site locally | `npm run dev` |
| Stop local server | Ctrl+C |
| Save changes to Git | `git add . && git commit -m "description" && git push` |
| Build for production | `npm run build` |
| Install dependencies | `npm install` |
