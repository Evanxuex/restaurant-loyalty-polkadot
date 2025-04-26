# Frontend Deployment Guide

This guide provides step-by-step instructions for deploying the Pearl & Leaves loyalty program frontend application.

## Prerequisites

Before deploying the frontend, ensure you have:

1. Node.js and npm installed
2. The ink! contract deployed (see [ink_contract_deployment.md](./ink_contract_deployment.md))
3. Your contract address from the deployment process

## Local Development Setup

### 1. Install Dependencies

```bash
cd restaurant-loyalty-polkadot/frontend
npm install
```

This will install all required dependencies, including:
- React and React DOM
- TypeScript
- Polkadot.js API and API Contract packages

### 2. Configure Environment

Create a `.env` file in the frontend directory with the following content:

```
REACT_APP_DEFAULT_NETWORK=westend
```

For production deployment, you may want to set this to `polkadot` instead.

### 3. Run Development Server

```bash
npm start
```

This will start the development server at http://localhost:3000.

## Deployment Options

### Option 1: GitHub Pages Deployment

1. **Update package.json**:
   
   Ensure your package.json has the following entries:

   ```json
   "homepage": "https://yourusername.github.io/restaurant-loyalty-polkadot",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

   Replace `yourusername` with your actual GitHub username.

2. **Install gh-pages package**:

   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy to GitHub Pages**:

   ```bash
   npm run deploy
   ```

4. **Configure GitHub Repository**:
   - Go to your GitHub repository settings
   - Under "GitHub Pages", select the gh-pages branch as the source
   - Your site will be published at the URL specified in your homepage setting

### Option 2: Netlify Deployment

1. **Create a netlify.toml file** in the project root:

   ```toml
   [build]
     base = "frontend/"
     publish = "build/"
     command = "npm run build"
   ```

2. **Deploy to Netlify**:
   - Create an account on Netlify
   - Connect your GitHub repository
   - Configure the build settings as specified in the netlify.toml file
   - Deploy your site

3. **Set up Environment Variables**:
   - In the Netlify dashboard, go to Site settings > Build & deploy > Environment
   - Add the same environment variables as in your local .env file

### Option 3: Vercel Deployment

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:

   ```bash
   cd frontend
   vercel
   ```

3. **Follow the prompts** to configure your deployment.

## Password Protection

To add password protection to your deployed site:

### For GitHub Pages:

1. Add the following script to `public/password-protection.js`:

```javascript
(function() {
  // Check if already authenticated
  const isAuthenticated = sessionStorage.getItem('auth');
  
  if (!isAuthenticated) {
    // Define your password
    const correctPassword = 'your-secret-password';
    
    // Prompt for password
    let password = prompt('Please enter the password to access this site:');
    
    // Check password
    if (password !== correctPassword) {
      alert('Incorrect password. Access denied.');
      // Redirect to a blank page or reload to prompt again
      window.location.href = 'about:blank';
      return;
    }
    
    // Store authentication in session storage
    sessionStorage.setItem('auth', 'true');
  }
})();
```

2. Update your `public/index.html` file to include this script:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- existing head content -->
    <script src="%PUBLIC_URL%/password-protection.js"></script>
  </head>
  <body>
    <!-- existing body content -->
  </body>
</html>
```

### For Netlify:

Use Netlify's built-in password protection:

1. Create a `_redirects` file in the `public` folder:
```
/* /index.html 200
```

2. Create a `netlify.toml` file with password protection:
```toml
[build]
  publish = "build/"

[[plugins]]
  package = "@netlify/plugin-password-protection"

[plugins.inputs]
  password = "your-secret-password"
```

## Using the Deployed Application

1. **Access your deployed application** using the URL provided by your hosting service.

2. **Connect your wallet**:
   - Click the "Connect Wallet" button
   - Approve the connection in your Polkadot.js extension or other wallet

3. **Enter your contract address**:
   - Paste the contract address from your ink! contract deployment
   - The application will automatically connect to your deployed contract

4. **Test the functionality**:
   - Record purchases for customers
   - Check badge status
   - Verify that the NFT reward system works after 10 purchases

## Troubleshooting

If you encounter issues with your deployed frontend:

1. **Contract Connection Issues**:
   - Verify that you're using the correct contract address
   - Ensure your wallet is connected to the same network as your contract (Westend or Polkadot)

2. **Wallet Connection Problems**:
   - Make sure you have the Polkadot.js extension installed
   - Check that your wallet has the correct network selected

3. **CORS Issues**:
   - If you see CORS errors in the console, you may need to configure your hosting service to allow cross-origin requests

4. **Password Protection Issues**:
   - If the password protection isn't working, check that the script is properly included in your HTML
   - Verify that your hosting service isn't caching the page in a way that bypasses the script
