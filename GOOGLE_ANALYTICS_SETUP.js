// Google Analytics 4 Setup Instructions
// ==========================================

// STEP 1: Create a Google Analytics Account
// -----------------------------------------
// 1. Go to https://analytics.google.com/
// 2. Click "Start measuring" or sign in
// 3. Create an account and property
// 4. Choose "Web" as your platform
// 5. Enter your website URL
// 6. Copy your MEASUREMENT ID (looks like G-XXXXXXXXXX)

// STEP 2: Add Tracking Code
// -----------------------------------------
// Once you have your measurement ID, add this code to index.html
//  in the <head> section, BEFORE the closing </head> tag:

/*
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
*/

// Replace G-XXXXXXXXXX with your actual Measurement ID

// STEP 3: Track Custom Events (Optional)
// -----------------------------------------
// To track button clicks (e.g., "Book a 15-min Audit"), add this
// to the button's onClick handler:

// onClick={() => {
//   if (window.gtag) {
//     window.gtag('event', 'click_audit_button', {
//       event_category: 'engagement',
//       event_label: 'Book 15-min Audit',
//     });
//   }
// }}

// STEP 4: Verify Installation
// -----------------------------------------
// 1. Deploy your site
// 2. Visit it in your browser
// 3. Go to Google Analytics > Reports > Realtime
// 4. You should see yourself as an active user
// 5. Wait 24-48 hours for full data

// PRIVACY NOTICE
// -----------------------------------------
// Consider adding a privacy policy and cookie consent banner
// if you're targeting EU users (GDPR compliance)

export { };
