# Straw Hut Media - Instagram Widget

A beautiful, responsive Instagram feed widget for your website footer. Features automatic hourly updates, smooth hover effects, and easy iframe embedding.

## ✨ Features

- 🔄 **Auto-refresh**: Automatically updates every hour with latest posts
- 🎨 **Hover effects**: Beautiful overlay with engagement stats
- 📱 **Responsive**: Works perfectly on all devices
- 🚀 **Easy embed**: Simple iframe integration
- ⚡ **Fast loading**: Optimized with caching
- 💅 **Modern design**: Instagram-style gradient and clean layout

## 🚀 Quick Start

### Option 1: Local Development (Recommended for Testing)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Instagram Access** (Optional - uses demo data if not configured):
   ```bash
   cp .env.example .env
   # Edit .env and add your Instagram access token
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **View the widget**:
   - Widget: http://localhost:3000
   - Demo page: http://localhost:3000/demo

### Option 2: Production Deployment

Deploy to your preferred hosting service:

#### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Deploy to Heroku
```bash
heroku create strawhut-instagram-widget
git push heroku main
heroku config:set INSTAGRAM_ACCESS_TOKEN=your_token_here
```

#### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli
# Deploy
railway up
```

## 🔑 Getting an Instagram Access Token

To fetch real Instagram data, you need an access token:

### Quick Method (For Personal/Business Accounts)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add **Instagram Basic Display** product
4. Configure OAuth redirect URLs
5. Generate an access token for your Instagram account

### Detailed Steps:

1. **Create a Facebook App**:
   - Visit https://developers.facebook.com/apps
   - Click "Create App"
   - Select "Business" type
   - Fill in app details

2. **Add Instagram Basic Display**:
   - In your app dashboard, click "Add Product"
   - Find "Instagram Basic Display" and click "Set Up"
   - Click "Create New App" in the Instagram Basic Display section

3. **Configure Settings**:
   - Add valid OAuth Redirect URIs (e.g., `https://yourdomain.com/`)
   - Add your Instagram account to "Instagram Testers"
   - Accept the tester invitation in your Instagram app

4. **Generate Access Token**:
   - Go to "Basic Display" > "User Token Generator"
   - Click "Generate Token" next to your Instagram account
   - Copy the token to your `.env` file

5. **Token Refresh** (tokens expire after 60 days):
   - Use the long-lived token exchange endpoint
   - Or regenerate from the dashboard

### Alternative: Use a Service

For easier setup without dealing with API complexities:
- **SnapWidget** (https://snapwidget.com/) - Free tier available
- **Elfsight** (https://elfsight.com/instagram-feed-instashow/) - Paid
- **Behold** (https://behold.so/) - Paid
- **Curator** (https://curator.io/) - Paid

## 📦 Embedding the Widget

### Option 1: Iframe Embed (Recommended)

Add this code to your website footer:

```html
<iframe
  src="https://your-deployed-url.com"
  width="100%"
  height="800"
  frameborder="0"
  scrolling="no"
  title="Straw Hut Media Instagram Feed">
</iframe>
```

### Option 2: Direct Integration

If you control the hosting, you can serve the widget directly:

```html
<div id="instagram-widget-container"></div>
<script src="https://your-deployed-url.com/widget.js"></script>
```

### Responsive Iframe Sizing

For better responsive behavior:

```html
<div style="position: relative; width: 100%; padding-bottom: 60%; overflow: hidden;">
  <iframe
    src="https://your-deployed-url.com"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    title="Straw Hut Media Instagram Feed">
  </iframe>
</div>
```

## 🎨 Customization

### Change the Number of Posts

Edit `server.js` line 129:
```javascript
.slice(0, 12) // Change 12 to your desired number
```

### Adjust Refresh Interval

Edit `widget.html` line 154:
```javascript
const REFRESH_INTERVAL = 60 * 60 * 1000; // Change to desired milliseconds
// Examples:
// 30 minutes: 30 * 60 * 1000
// 2 hours: 2 * 60 * 60 * 1000
```

### Modify Styling

Edit the `<style>` section in `widget.html`:
- Colors: Search for gradient colors and modify
- Grid layout: Modify `.instagram-grid` properties
- Hover effects: Adjust `.instagram-post:hover` styles

### Change Grid Columns

Edit `widget.html` line 46:
```css
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
/* Change 280px to control minimum column width */
```

## 🛠️ Development

### File Structure
```
instagram-widget/
├── server.js           # Express server with API endpoint
├── widget.html         # Main widget HTML/CSS/JS
├── demo.html          # Demo page with embedding examples
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
└── README.md          # Documentation
```

### Development Mode

Run with auto-reload:
```bash
npm run dev
```

### API Endpoints

- `GET /` - Widget page
- `GET /demo` - Demo page
- `GET /api/instagram-feed` - Instagram posts JSON API
- `GET /health` - Health check

## 🔍 Troubleshooting

### Widget shows demo data
- Make sure `.env` file exists with valid `INSTAGRAM_ACCESS_TOKEN`
- Check server logs for API errors
- Verify your token hasn't expired

### CORS errors
- Ensure the server is running
- Check that CORS is enabled in `server.js`
- Verify your domain is allowed

### Posts not updating
- Check browser console for errors
- Verify API endpoint is accessible
- Clear browser cache and localStorage

### Token expired
- Instagram tokens expire after 60 days
- Regenerate token from Facebook Developer Console
- Consider implementing automatic token refresh

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

- Never commit `.env` file with real tokens
- Use environment variables in production
- Consider rate limiting for public deployments
- Validate and sanitize all user-facing data

## 📄 License

MIT License - feel free to use for any project

## 🆘 Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with details
- Contact: [Your contact information]

## 🎯 Roadmap

- [ ] Add video post support
- [ ] Implement infinite scroll
- [ ] Add lightbox for enlarged view
- [ ] Support for Instagram Stories
- [ ] Multi-account support
- [ ] Custom filters and sorting

---

Built with ❤️ for Straw Hut Media
