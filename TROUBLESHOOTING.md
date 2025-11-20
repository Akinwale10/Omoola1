# Google Authentication Troubleshooting Guide

This guide will help you diagnose and fix Google Authentication issues on the Omoola Pharmacy website.

## 🔍 Quick Diagnosis Checklist

Use this checklist to quickly identify the issue:

- [ ] Is Google Sign-In enabled in Firebase Console?
- [ ] Is your domain added to Firebase Authorized Domains?
- [ ] Is the OAuth consent screen configured in Google Cloud Console?
- [ ] Are you using HTTPS in production (required by Google)?
- [ ] Is your browser blocking popups?
- [ ] Are there any console errors in the browser?

## 🚨 Common Error Messages & Solutions

### Error: "This domain is not authorized"

**What it means:** The domain you're accessing the site from is not in the Firebase Authorized Domains list.

**How to fix:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`omoola`)
3. Navigate to **Authentication** > **Settings** > **Authorized domains**
4. Click **Add domain** and enter your domain
5. Wait 2-3 minutes for changes to propagate
6. Clear browser cache and try again

**Domains to add:**
- `localhost` (for development)
- Your production domain (e.g., `omoola.com`)
- `www.omoola.com` (if applicable)
- Any staging domains

---

### Error: "This app is blocked" or "Access blocked: This app's request is invalid"

**What it means:** The OAuth consent screen is not properly configured or the app is in testing mode.

**How to fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select the project linked to Firebase
3. Navigate to **APIs & Services** > **OAuth consent screen**
4. Complete all required fields:
   - App name
   - User support email
   - Developer contact email
   - Authorized domains
5. If app is in "Testing" mode:
   - Option A: Add your email to test users
   - Option B: Publish the app (click "PUBLISH APP")

---

### Error: "Popup blocked" or popup doesn't appear

**What it means:** The browser is blocking the authentication popup.

**How to fix:**
The code automatically handles this! When a popup is blocked:
1. You'll see an info message: "Popup blocked. Redirecting to Google Sign-In..."
2. The system automatically switches to redirect method
3. You'll be redirected to Google's sign-in page
4. After signing in, you'll be redirected back to the site

**Manual fix if needed:**
1. Look for the popup blocker icon in your browser's address bar
2. Click it and select "Always allow popups from this site"
3. Try signing in again

---

### Error: "Operation not allowed" or "auth/operation-not-allowed"

**What it means:** Google Sign-In is not enabled in Firebase.

**How to fix:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`omoola`)
3. Navigate to **Authentication** > **Sign-in method**
4. Find **Google** in the providers list
5. Click **Google**
6. Toggle **Enable** to ON
7. Set a **Project support email** (required)
8. Click **Save**

---

### Error: "Network error" or "auth/network-request-failed"

**What it means:** There's a network connectivity issue or CORS problem.

**How to fix:**
1. Check your internet connection
2. Try refreshing the page
3. If in production, ensure you're using HTTPS (not HTTP)
4. Check browser console for CORS errors
5. Verify Firebase configuration in `js/firebase-config.js`

---

### Error: "Account exists with different credential"

**What it means:** A user tried to sign in with Google, but an account already exists with that email using a different method (e.g., email/password).

**How to fix (for users):**
1. Sign in using the original method (email/password)
2. Link the Google account in the profile settings (if implemented)

**How to prevent (for developers):**
1. In Firebase Console, enable account linking
2. Implement account linking in your code

---

### Error: "Too many requests" or "auth/too-many-requests"

**What it means:** Too many failed authentication attempts from the same IP.

**How to fix:**
1. Wait 15-30 minutes before trying again
2. Clear browser cache and cookies
3. Try from a different network or device
4. Contact Firebase support if issue persists

---

## 🧪 Using the Diagnostics Tool

We've created a diagnostic tool to help identify issues:

1. Navigate to `auth-diagnostics.html` in your browser
2. The tool will automatically run checks
3. Review the results:
   - ✅ Green = Working correctly
   - ❌ Red = Issue found
   - ⚠️ Yellow = Warning
4. Click "Test Google Sign-In (Popup)" to test authentication
5. Check the Activity Log for detailed information

---

## 🔧 Verifying Your Setup

### Step 1: Check Firebase Console

```
✅ Firebase Console Checklist:
- [ ] Project exists and is accessible
- [ ] Google Sign-In is enabled
- [ ] Support email is set
- [ ] All domains are in Authorized Domains list
- [ ] Billing is enabled (required for some features)
```

### Step 2: Check Google Cloud Console

```
✅ Google Cloud Console Checklist:
- [ ] OAuth consent screen is configured
- [ ] App name is set
- [ ] User support email is set
- [ ] Developer contact email is set
- [ ] Authorized domains are added
- [ ] App status is appropriate (Testing or Published)
```

### Step 3: Check Browser Console

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Common error codes to look for:
   - `auth/popup-blocked`
   - `auth/unauthorized-domain`
   - `auth/operation-not-allowed`
   - `auth/network-request-failed`

### Step 4: Check Network Tab

1. Open browser developer tools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for failed requests (red status codes)
5. Check if Firebase scripts are loading:
   - `firebase-app.js`
   - `firebase-auth.js`

---

## 🎯 Testing Your Fix

After making changes:

1. **Clear everything:**
   ```
   - Clear browser cache
   - Clear cookies for your site
   - Close all browser tabs
   ```

2. **Wait for propagation:**
   ```
   - Firebase config changes: 2-3 minutes
   - DNS changes: 5-10 minutes
   - OAuth consent screen: 5-10 minutes
   ```

3. **Test in incognito/private mode:**
   ```
   - Ensures no cached data interferes
   - Tests like a new user would experience
   ```

4. **Test the complete flow:**
   ```
   a. Navigate to login.html
   b. Click "Google" button
   c. Select Google account
   d. Grant permissions if asked
   e. Verify redirect to shop.html
   f. Check that user is logged in
   ```

5. **Test edge cases:**
   ```
   - Popup blocked scenario
   - Cancel sign-in
   - Sign out and sign in again
   - Different browsers
   - Mobile devices
   ```

---

## 🔐 Production Deployment Checklist

Before deploying to production:

- [ ] Firebase project is in production mode
- [ ] All production domains added to Authorized Domains
- [ ] OAuth consent screen is published (not in testing)
- [ ] HTTPS is enabled (required by Google)
- [ ] SSL certificate is valid
- [ ] Google Analytics configured (optional)
- [ ] Error tracking configured (optional)
- [ ] Tested on major browsers (Chrome, Firefox, Safari, Edge)
- [ ] Tested on mobile devices (iOS, Android)
- [ ] Privacy policy URL added to OAuth consent screen
- [ ] Terms of service URL added to OAuth consent screen

---

## 📞 Getting Help

If you've followed all steps and still have issues:

1. **Check Firebase Status:**
   - Visit [Firebase Status Dashboard](https://status.firebase.google.com)
   - Check if there are any ongoing outages

2. **Search Firebase Documentation:**
   - [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
   - [Google Sign-In Documentation](https://firebase.google.com/docs/auth/web/google-signin)

3. **Community Support:**
   - [Stack Overflow - Firebase Tag](https://stackoverflow.com/questions/tagged/firebase)
   - [Firebase Community Forum](https://firebase.google.com/community)

4. **Firebase Support:**
   - Go to Firebase Console
   - Click the **?** icon
   - Select **Contact Support**
   - Describe your issue with error codes

5. **Check the Code:**
   - Review `js/auth.js` for implementation
   - Check browser console for JavaScript errors
   - Verify Firebase config in `js/firebase-config.js`

---

## 🐛 Debug Mode

Enable debug mode to see detailed logs:

```javascript
// Add this to js/firebase-config.js temporarily
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
const auth = getAuth(app);

// Enable debug logging
auth.settings.appVerificationDisabledForTesting = true;
console.log('Firebase Auth Debug Mode Enabled');
```

Then check the browser console for detailed logs.

---

## 📝 Reporting Issues

If you need to report an issue, include:

1. **Error message** (exact text)
2. **Error code** (e.g., `auth/popup-blocked`)
3. **Browser and version** (e.g., Chrome 120)
4. **Operating system** (e.g., Windows 11)
5. **Steps to reproduce**
6. **Screenshot of error**
7. **Browser console logs**
8. **Current domain/URL**

---

## ✅ Success Indicators

You'll know authentication is working when:

- ✅ Clicking "Google" button opens Google sign-in
- ✅ After selecting account, redirects back to site
- ✅ User sees welcome message
- ✅ User is redirected to shop.html
- ✅ User's name appears in the UI (if implemented)
- ✅ User remains logged in after page refresh
- ✅ No console errors
- ✅ Works on different browsers and devices

---

## 🔄 Regular Maintenance

To keep authentication working:

- **Monthly:**
  - Check Firebase Console for security alerts
  - Review authentication logs for anomalies
  - Update Firebase SDK if new versions available

- **When updating domains:**
  - Add new domains to Firebase Authorized Domains
  - Update OAuth consent screen
  - Test authentication on new domain

- **When updating code:**
  - Test authentication after each deployment
  - Monitor error logs for authentication failures
  - Keep Firebase SDK updated

---

Last Updated: 2024-11-20
Version: 1.0
