# Firebase Authentication Setup Guide

This guide will help you configure Google Authentication for the Omoola Pharmacy & Stores website.

## Prerequisites

- A Firebase project (already created: `omoola`)
- Access to the Firebase Console (https://console.firebase.google.com)
- Admin access to the project

## Current Configuration

The website is configured with the following Firebase project:

```javascript
Project ID: omoola
Auth Domain: omoola.firebaseapp.com
API Key: AIzaSyA97xqLri9R7Z7NULITp9DsOSdLfCxfJs8
```

## Setup Steps

### 1. Enable Google Sign-In Method

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select the `omoola` project
3. Navigate to **Authentication** > **Sign-in method**
4. Find **Google** in the list of providers
5. Click **Google** to open the configuration
6. Toggle **Enable** to ON
7. Set the **Project support email** (required by Google)
8. Click **Save**

### 2. Configure Authorized Domains

Google Sign-In only works on authorized domains. You need to add all domains where your website will be hosted.

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add the following domains:
   - `localhost` (for local development) - *should already be present*
   - Your production domain (e.g., `omoola.com`, `www.omoola.com`)
   - Any staging/test domains (e.g., `staging.omoola.com`)
   - If using Firebase Hosting: `omoola.web.app` and `omoola.firebaseapp.com`
   - If using other hosting (Netlify, Vercel, etc.): Add those domains

**Example domains to add:**
```
localhost
omoola.com
www.omoola.com
omoola.web.app
omoola.firebaseapp.com
```

### 3. Configure OAuth Consent Screen (Google Cloud Console)

For production use, you need to configure the OAuth consent screen:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select the project linked to your Firebase project
3. Navigate to **APIs & Services** > **OAuth consent screen**
4. Fill in the required information:
   - **App name**: Omoola Pharmacy & Stores
   - **User support email**: Your support email
   - **App logo**: Upload your logo (optional but recommended)
   - **Application home page**: Your website URL
   - **Authorized domains**: Add your domain(s)
   - **Developer contact information**: Your email
5. Click **Save and Continue**
6. Add scopes (optional): `email`, `profile`, `openid`
7. Complete the setup wizard

### 4. Verify Configuration

After setup, verify that:

- ✅ Google Sign-In is enabled in Firebase Authentication
- ✅ All production domains are listed in Authorized Domains
- ✅ OAuth consent screen is configured
- ✅ Project support email is set

## Testing

### Local Testing

1. Run a local web server (e.g., `python3 -m http.server 8080`)
2. Open `http://localhost:8080/login.html`
3. Click the "Google" button
4. You should see the Google Sign-In popup

### Production Testing

1. Deploy your website to your hosting service
2. Ensure the domain is added to Authorized Domains (step 2 above)
3. Open your website and navigate to the login page
4. Click the "Google" button
5. Complete the Google Sign-In flow

## Common Issues and Solutions

### Issue 1: "This app is blocked"

**Cause**: OAuth consent screen is not configured or the app is in testing mode with restricted users.

**Solution**:
- Configure the OAuth consent screen (see step 3)
- If in testing mode, add test users in Google Cloud Console
- Or publish the app for production use

### Issue 2: "Popup blocked by browser"

**Cause**: Browser is blocking the popup window.

**Solution**:
- The code now includes automatic fallback to redirect method
- Users will see a message to allow popups
- The redirect method will be used automatically if popup fails

### Issue 3: "This domain is not authorized"

**Cause**: The domain you're using is not in the Authorized Domains list.

**Solution**:
- Add the domain to Authorized Domains in Firebase Console (see step 2)
- Wait a few minutes for changes to propagate
- Clear browser cache and try again

### Issue 4: "Operation not allowed"

**Cause**: Google Sign-In is not enabled in Firebase.

**Solution**:
- Enable Google Sign-In in Firebase Console (see step 1)

### Issue 5: Network errors or CORS issues

**Cause**: Incorrect Firebase configuration or network issues.

**Solution**:
- Verify the Firebase config in `js/firebase-config.js` is correct
- Check browser console for specific error messages
- Ensure you're using HTTPS in production (required by Firebase)

## Code Implementation

The Google Sign-In implementation includes:

### Features
- ✅ Popup-based authentication (primary method)
- ✅ Redirect-based authentication (fallback for popup blockers)
- ✅ Comprehensive error handling with user-friendly messages
- ✅ Loading states during authentication
- ✅ Auto-detection and handling of redirect results
- ✅ Support for account selection prompt

### Files
- `js/firebase-config.js` - Firebase initialization
- `js/auth.js` - Authentication logic including Google Sign-In
- `login.html` - Login page with Google Sign-In button

## Security Best Practices

1. **Never commit sensitive credentials**: Firebase API keys are public and safe to commit, but service account keys should never be committed
2. **Use environment variables**: For sensitive configuration in server-side code
3. **Configure authorized domains**: Only add domains you control
4. **Enable App Check**: For additional security (optional, advanced)
5. **Monitor authentication logs**: Regularly check Firebase Console for suspicious activity
6. **Use HTTPS**: Always use HTTPS in production

## Support

If you encounter issues not covered in this guide:

1. Check the [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
2. Review the browser console for error messages
3. Check Firebase Console > Authentication > Users to see if users are being created
4. Contact Firebase Support through the Firebase Console

## Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google Sign-In for Websites](https://developers.google.com/identity/sign-in/web)
- [OAuth 2.0 Consent Screen Configuration](https://support.google.com/cloud/answer/10311615)
- [Firebase Hosting Authorized Domains](https://firebase.google.com/docs/auth/web/redirect-best-practices)

---

Last Updated: 2024-11-20
