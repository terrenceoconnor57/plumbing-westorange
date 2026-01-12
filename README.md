# West Orange Plumbing Services Website

A high-performance, lead generation website built with vanilla HTML, CSS, and JavaScript. Optimized for Google Ads campaigns.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Functional Contact Form**: Validates user input and stores submissions locally
- **Phone Formatting**: Automatic phone number formatting as users type
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **SEO Optimized**: Semantic HTML, meta tags, and performance optimizations
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no frameworks required
- **Fast Loading**: Optimized for speed and performance
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## File Structure

```
plumbing-westorange/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Form validation and interactions
└── README.md          # This file
```

## Form Functionality

The contact form includes:
- Real-time validation
- Phone number auto-formatting
- Email validation
- Required field checking
- Human verification checkbox
- Success/error messaging
- Email notifications via Vercel serverless function

## Email Notifications Setup

The form automatically sends email notifications using Resend API via Vercel serverless functions.

### Setup Instructions:

1. **Sign up for Resend** (free tier available)
   - Go to [https://resend.com](https://resend.com)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure Environment Variables in Vercel**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     ```
     RESEND_API_KEY=re_your_actual_api_key
     TO_EMAIL=your-email@example.com
     ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Optional: Use Your Own Domain for Emails**
   - In Resend dashboard, add and verify your domain
   - Update `from` field in `api/send-email.js` to use your domain:
     ```javascript
     from: 'West Orange Plumbing <leads@yourdomain.com>'
     ```

### Email Features:
- Professional HTML email template
- All form data included
- Clickable phone and email links
- Timestamp with timezone
- Urgent lead notification styling

## Google Ads Integration

The website is optimized for Google Ads:

1. **Conversion Tracking**: Add your Google Ads conversion tracking code before `</head>` in `index.html`
2. **Google Analytics**: Add GA4 tracking code before `</head>` in `index.html`
3. **Facebook Pixel**: Add Facebook Pixel code if needed

Example conversion tracking (add to index.html):

```html
<!-- Google Ads Conversion Tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

## Performance Optimizations

- Minimal CSS and JavaScript
- No external dependencies (except Google Fonts)
- Optimized images (use data URIs for placeholders)
- Lazy loading support
- Reduced motion support for accessibility
- Debounced scroll events

## Customization

### Colors
Edit CSS variables in `styles.css` (lines 8-17):

```css
:root {
    --primary-blue: #0066b2;
    --secondary-blue: #1a8cd8;
    --orange: #d4883f;
    /* ... */
}
```

### Contact Information
Update phone number and email in `index.html`:
- Header phone: Line ~23
- Contact section: Lines ~150-160

### Services
Modify services in the Services section (lines ~110-145 in `index.html`)

### Background Image
Replace the hero background in `styles.css` (line ~275) with your own image:

```css
.hero {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url('path-to-your-image.jpg');
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

1. Upload all files to your web hosting
2. Ensure files are in the root directory or adjust paths accordingly
3. Test the form submission
4. Add your tracking codes
5. Configure SSL certificate for HTTPS

## Local Development

Simply open `index.html` in a web browser. For a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## License

Proprietary - West Orange Plumbing Services

## Support

For questions or modifications, contact your web developer.
