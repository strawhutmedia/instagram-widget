# Instagram Widget - Iframe Embed Code

## For Your Developer

Here's the iframe code to embed the Straw Hut Media Instagram widget into your website footer.

---

## 📋 Quick Embed Code

### Option 1: Basic Embed (Recommended for most sites)

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

### Option 2: Responsive Embed (Auto-adjusts to screen size)

```html
<div style="position: relative; width: 100%; padding-bottom: 60%; overflow: hidden;">
  <iframe
    src="https://your-deployed-url.com"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    title="Straw Hut Media Instagram Feed">
  </iframe>
</div>
```

---

## 🔧 Implementation Steps

### Before Embedding:

1. **Deploy the widget** to a hosting service (Vercel, Heroku, Railway, etc.)
2. **Get your deployment URL** (e.g., `https://strawhut-instagram.vercel.app`)
3. **Replace** `https://your-deployed-url.com` in the code above with your actual deployment URL
4. **Test** the widget by visiting your deployment URL first

### After Getting Your Deployment URL:

1. **Copy** one of the embed codes above
2. **Replace** `https://your-deployed-url.com` with your actual URL
3. **Paste** the code into your website's footer HTML
4. **Save and publish** your website changes

---

## 🎨 Customization Options

### Adjust Height

Change the `height="800"` value in the iframe to fit your design:
- Smaller: `height="600"` (shows 2-3 rows)
- Default: `height="800"` (shows 3-4 rows)
- Larger: `height="1000"` (shows 4-5 rows)

### Adjust Width

The widget is responsive by default. For fixed-width containers:

```html
<div style="max-width: 1200px; margin: 0 auto;">
  <iframe
    src="https://your-deployed-url.com"
    width="100%"
    height="800"
    frameborder="0"
    scrolling="no"
    title="Straw Hut Media Instagram Feed">
  </iframe>
</div>
```

---

## 📱 Platform-Specific Instructions

### WordPress

1. Go to **Appearance > Widgets** or use the block editor
2. Add a **Custom HTML** block/widget
3. Paste the iframe code
4. Save changes

### Shopify

1. Go to **Online Store > Themes > Customize**
2. Add a **Custom Liquid** section to your footer
3. Paste the iframe code
4. Save and publish

### Squarespace

1. Add a **Code Block** to your footer
2. Paste the iframe code
3. Click **Apply**

### Wix

1. Add an **Embed** element to your footer
2. Choose **Embed a Widget**
3. Paste the iframe code
4. Adjust size as needed

### Custom HTML Sites

1. Locate your footer template file (usually `footer.html` or `footer.php`)
2. Paste the iframe code where you want the widget
3. Upload and test

---

## ✅ Checklist for Your Developer

- [ ] Widget deployed to hosting service
- [ ] Deployment URL obtained
- [ ] Iframe code updated with actual deployment URL
- [ ] Iframe code added to website footer
- [ ] Widget displays correctly on desktop
- [ ] Widget displays correctly on mobile
- [ ] Links to Instagram work properly
- [ ] Auto-refresh is working (check after 1 hour)

---

## 🆘 Troubleshooting

**Widget not showing:**
- Check that the deployment URL is correct and accessible
- Verify there are no console errors in browser dev tools
- Ensure the iframe isn't blocked by security policies

**Widget too tall/short:**
- Adjust the `height` value in the iframe code
- For responsive height, use Option 2 embed code

**Widget not updating:**
- The widget refreshes every hour automatically
- Manual refresh: clear browser cache and reload

**CORS errors:**
- Ensure the server has CORS enabled (already configured in server.js)
- Check that the deployment URL uses HTTPS in production

---

## 📞 Support

If you encounter any issues:
1. Check the README.md for detailed setup instructions
2. Verify all deployment steps were completed
3. Test the widget URL directly in a browser first
4. Contact your development team with specific error messages

---

**Widget Version:** 1.0.0
**Last Updated:** 2026-01-11
**Instagram Account:** @strawhut.media
