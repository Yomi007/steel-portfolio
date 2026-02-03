# Formspree Setup Instructions

## Quick Start: 3 Steps to Get Your Contact Form Working

### Step 1: Create Free Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" (free tier is perfect)
3. Sign up with your email
4. Verify your email address

### Step 2: Create a New Form
1. Click "New Form" in your Formspree dashboard
2. Give it a name (e.g., "Portfolio Contact Form")
3. Formspree will generate a unique form ID (looks like `xyzabc123`)
4. Copy this Form ID

### Step 3: Update Your Code
1. Open [Contact.jsx](file:///c:/Users/YOMI/Desktop/steel-portfolio/src/components/Contact.jsx)
2. Find line **18** where it says:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree Form ID
4. Save the file

**Example:**
```javascript
const response = await fetch('https://formspree.io/f/xyzabc123', {
```

### Step 4: Test It!
1. Fill out the contact form on your portfolio
2. Submit it
3. Check your email inbox (the one you used for Formspree)
4. You should receive the form submission!

## Configuration Options

### Customize Email Notifications
In Formspree dashboard:
- Set custom subject lines
- Add auto-reply to form submitters
- Configure spam protection (reCAPTCHA)
- Add file upload support

### Formspree Free Tier Limits
- ✅ 50 submissions per month
- ✅ Unlimited forms
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Export submissions

## Troubleshooting

**Form not submitting?**
- Check that you replaced `YOUR_FORM_ID` with your actual ID
- Verify your Formspree account is verified
- Check browser console for errors

**Not receiving emails?**
- Check spam folder
- Verify email address in Formspree settings
- Ensure Formspree account is active

**Getting CORS errors?**
- Add your domain to Formspree's allowed origins in dashboard
- This shouldn't happen in production but may occur in development

## Alternative: EmailJS

If you prefer EmailJS instead:
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create account and email service
3. Replace the Formspree fetch code with EmailJS SDK

## Ready to Go Live?

Once configured, your contact form will:
- ✅ Send you emails when someone contacts you
- ✅ Show loading state while submitting
- ✅ Display success message on successful send
- ✅ Show error message if something goes wrong
- ✅ Work on any domain (localhost, GitHub Pages, Vercel, etc.)

Your email: **yomiautomates@gmail.com**
