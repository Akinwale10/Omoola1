// Firebase Configuration
// In production, use environment variables or a secure config service
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Cloudinary Configuration
const cloudinaryConfig = {
    cloudName: "YOUR_CLOUD_NAME",
    apiKey: "YOUR_CLOUDINARY_API_KEY",
    uploadPreset: "YOUR_UPLOAD_PRESET"
};

// Export configurations
window.firebaseConfig = firebaseConfig;
window.cloudinaryConfig = cloudinaryConfig;
