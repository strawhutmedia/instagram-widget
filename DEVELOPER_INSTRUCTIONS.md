# Developer Instructions - Instagram Widget Setup

## Quick Start (10-15 minutes)

This Instagram widget is **100% complete** and ready to deploy. You just need to:

1. Get an Instagram API token
2. Deploy the widget
3. Add the iframe to the website footer

---

## Step 1: Get Instagram API Token (Desktop Only - 10 min)

**Go to:** https://developers.facebook.com/apps

### A. Create Facebook App
1. Click **"Create App"** (green button, top right)
2. Choose **"Other"** for use case → Next
3. Choose **"Business"** for app type → Next
4. Fill in:
   - App Name: `Straw Hut Instagram Widget`
   - Contact Email: ryan@strawhutmedia.com (or your email)
5. Click **"Create App"**

### B. Add Instagram Basic Display
1. On the app dashboard, scroll to **"Add products to your app"**
2. Find **"Instagram Basic Display"** (NOT "Instagram Graph API")
3. Click **"Set Up"**
4. Click **"Create New App"** in the Instagram Basic Display section

### C. Configure Settings
1. In left sidebar: **Instagram Basic Display** → **Basic Display**
2. Click **"Add or Remove Instagram Testers"**
3. Add: `strawhut.media` (the Instagram username)
4. Click **Submit**

### D. Accept Invitation (On Instagram)
1. Open Instagram app or instagram.com
2. Go to **Settings** → **Apps and Websites** → **Tester Invites**
3. **Accept** the invitation from your app

### E. Generate Token
1. Back in Facebook Developers: **Instagram Basic Display** → **Basic Display**
2. Scroll to **"User Token Generator"**
3. Click **"Generate Token"** next to @strawhut.media
4. **Copy the long token** (200+ characters)
5. **Save it** - you'll need it in Step 2

---

## Step 2: Deploy to Vercel (5 minutes - FREE)

### Option A: Deploy via Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import: `strawhutmedia/instagram-widget`
5. In **Environment Variables**, add:
   - Name: `INSTAGRAM_ACCESS_TOKEN`
   - Value: [paste the token from Step 1E]
6. Click **"Deploy"**
7. Wait 1-2 minutes
8. **Copy your deployment URL** (e.g., `https://instagram-widget-xyz.vercel.app`)

### Option B: Deploy via CLI
```bash
# Clone the repo
git clone https://github.com/strawhutmedia/instagram-widget.git
cd instagram-widget

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# When prompted, add environment variable:
# INSTAGRAM_ACCESS_TOKEN = [paste your token]
```

After deployment, you'll get a URL like: `https://instagram-widget-xyz.vercel.app`

---

## Step 3: Add to Website Footer (2 minutes)

Add this iframe code to your website's footer:

```html
<iframe
  src="https://your-vercel-url.vercel.app"
  width="100%"
  height="800"
  frameborder="0"
  scrolling="no"
  title="Straw Hut Media Instagram Feed">
</iframe>
```

**Replace** `https://your-vercel-url.vercel.app` with your actual Vercel deployment URL.

### For Responsive Height:
```html
<div style="position: relative; width: 100%; padding-bottom: 60%; overflow: hidden;">
  <iframe
    src="https://your-vercel-url.vercel.app"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    title="Straw Hut Media Instagram Feed">
  </iframe>
</div>
```

---

## Features (Already Built-In)

✅ **Auto-refresh every hour** - Automatically fetches new posts
✅ **Hover effects** - Shows likes, comments, and captions
✅ **Responsive design** - Works on all devices
✅ **Caching** - Fast loading with 1-hour cache
✅ **Direct links** - Each post links to Instagram

---

## Testing

1. After deployment, visit your Vercel URL directly
2. You should see real Instagram posts from @strawhut.media
3. Test hover effects (hover over each post)
4. Test on mobile (should be fully responsive)
5. Once confirmed, add iframe to website footer

---

## Troubleshooting

### Widget shows demo data instead of real posts
- Check that `INSTAGRAM_ACCESS_TOKEN` is set in Vercel environment variables
- Verify the token hasn't expired (tokens last 60 days)
- Check Vercel logs for API errors

### Token expired error
- Instagram tokens expire after 60 days
- Go back to Facebook Developers → Instagram Basic Display → User Token Generator
- Generate a new token
- Update the token in Vercel's environment variables

### Posts not updating
- Widget automatically refreshes every hour
- To force refresh: clear browser cache or wait for next hourly update
- Check Vercel function logs for errors

---

## Alternative Deployment Options

### Heroku
```bash
heroku create strawhut-instagram-widget
git push heroku main
heroku config:set INSTAGRAM_ACCESS_TOKEN=your_token_here
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
# Add INSTAGRAM_ACCESS_TOKEN in Railway dashboard
```

---

## Repository Structure

```
instagram-widget/
├── server.js           # Backend API (fetches Instagram data)
├── widget.html         # Main widget (frontend)
├── demo.html          # Demo page
├── package.json       # Dependencies
├── .env.example       # Environment template
├── README.md          # Full documentation
└── EMBED.md           # Iframe embedding guide
```

---

## Support

- **GitHub Repo:** https://github.com/strawhutmedia/instagram-widget
- **Full README:** See README.md in the repo
- **Questions:** Create an issue on GitHub

---

## Token Renewal (Every 60 Days)

Instagram tokens expire after 60 days. Set a calendar reminder to:

1. Go to Facebook Developers dashboard
2. Navigate to your app → Instagram Basic Display → User Token Generator
3. Generate new token
4. Update in Vercel environment variables (Settings → Environment Variables)
5. Redeploy if needed

---

**Estimated Total Time:** 15-20 minutes
**Cost:** $0 (Vercel free tier is sufficient)
**Maintenance:** Renew token every 60 days (5 minutes)
