# Email Notification Setup Guide

## Quick Setup (5 minutes)

### Step 1: Sign up for Resend
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (no credit card required)
3. Verify your email address
4. Copy your API key from the dashboard

### Step 2: Deploy to Vercel
1. Install Vercel CLI (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project directory:
   ```bash
   cd /Users/terrenceoconnor/ai/plumbing-westorange
   vercel
   ```

### Step 3: Configure Environment Variables
1. Go to [https://vercel.com](https://vercel.com) and find your project
2. Click on "Settings" → "Environment Variables"
3. Add these two variables:
   - **RESEND_API_KEY**: Your Resend API key (starts with `re_`)
   - **TO_EMAIL**: Your email address where you want to receive leads

4. Redeploy to apply changes:
   ```bash
   vercel --prod
   ```

### Step 4: Test the Form
1. Visit your deployed site
2. Fill out the contact form
3. Submit and check your email!

## Email Format

You'll receive beautifully formatted emails with:
- Customer name
- Email address (clickable)
- Phone number (clickable)
- Service requested
- Message
- Timestamp

## Troubleshooting

### Not receiving emails?
1. Check your Vercel environment variables are set correctly
2. Check your spam folder
3. Verify your Resend API key is active
4. Check Vercel function logs for errors

### How to check Vercel logs:
```bash
vercel logs
```

Or visit: Vercel Dashboard → Your Project → Logs

## Cost

- **Resend Free Tier**: 3,000 emails/month
- **Vercel Free Tier**: 100GB bandwidth, unlimited serverless function invocations

Perfect for a lead generation site!

## Alternative: Use Your Own Domain

Once you have more leads, you can:
1. Add your domain to Resend
2. Verify DNS records
3. Update the `from` email in `api/send-email.js`:
   ```javascript
   from: 'West Orange Plumbing <leads@yourdomain.com>'
   ```

This makes emails look more professional and improves deliverability.
