# Deployment Guide

This guide will help you deploy the Task Manager application to **Render** (backend) and **Vercel** (frontend).

---

## Prerequisites

1. **GitHub Account** - You'll need to push your code to GitHub
2. **Render Account** - Sign up at https://render.com
3. **Vercel Account** - Sign up at https://vercel.com
4. **MongoDB Atlas Account** - Sign up at https://www.mongodb.com/atlas for free database

---

## Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Prepare for deployment"

# Create a new GitHub repository and push
git remote add origin https://github.com/yourusername/task-manager.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/atlas and create a free account
2. Create a new project
3. Build a database:
   - Choose "M0" (Free tier)
   - Select a region close to your users
   - Create a database user (username/password)
4. **Network Access**: Add IP address `0.0.0.0/0` (allows all IPs)
5. **Get Connection String**:
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
   ```
   - Replace `username` and `password` with your credentials

---

## Step 3: Deploy Backend to Render

### 3.1 Create Web Service

1. Go to https://dashboard.render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `task-manager-backend`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

### 3.2 Set Environment Variables

In the Render dashboard, go to "Environment" tab and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A random string (use: `openssl rand -hex 32`) |
| `CORS_ORIGIN` | `*` (or your Vercel frontend URL) |
| `PORT` | Leave empty (Render sets this) |

### 3.3 Deploy

Click "Create Web Service". Wait for the build to complete.

**Test your API**: Visit `https://task-manager-backend.onrender.com/api/health`

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Project

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 4.2 Set Environment Variables

In Vercel settings, add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | Your Render backend URL (e.g., `https://task-manager-backend.onrender.com`) |

### 4.3 Deploy

Click "Deploy". Wait for the build to complete.

**Your frontend URL**: `https://task-manager-frontend.vercel.app`

---

## Step 5: Update CORS (Production)

After deploying, update your backend CORS to be more secure:

1. Go to Render dashboard → Your backend service → "Environment"
2. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN=https://task-manager-frontend.vercel.app
   ```
3. Redeploy the backend

---

## Testing Your Deployment

1. **Backend Health Check**: `https://your-backend.onrender.com/api/health`
2. **Frontend**: Open your Vercel URL
3. **Register/Login**: Test user authentication
4. **Create Task**: Test CRUD operations

---

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` is set correctly in Render
- Check that the frontend URL matches exactly

### MongoDB Connection Issues
- Verify IP whitelist includes `0.0.0.0/0`
- Check username/password in connection string
- Ensure database name is correct in URI

### Authentication Not Working
- Verify `JWT_SECRET` is the same in backend environment
- Check browser console for API errors

---

## Project Structure After Deployment

```
Frontend (Vercel)
https://task-manager-frontend.vercel.app
    ↓
API Calls
    ↓
Backend (Render)
https://task-manager-backend.onrender.com
    ↓
Database
MongoDB Atlas
```

---

## Quick Commands

### Generate JWT Secret
```bash
# Linux/Mac
openssl rand -hex 32

# Windows (PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test MongoDB Connection
```bash
# Test locally first
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_URI').then(() => console.log('Connected!')).catch(console.error);"
```

---

## Important Notes

1. **Free Tier Limits**:
   - Render: 750 hours/month, 100GB bandwidth
   - Vercel: Unlimited deployments, 100GB bandwidth
   - MongoDB Atlas: 512MB storage

2. **Cold Starts**: Render free tier may have slow first response (wake up from idle)

3. **HTTPS**: Both Render and Vercel provide automatic HTTPS

4. **Environment Variables**: Never commit `.env` files to GitHub!

