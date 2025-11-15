// Firebase Configuration
// In production, use environment variables or a secure config service
const firebaseConfig = {
  apiKey: "AIzaSyA97xqLri9R7Z7NULITp9DsOSdLfCxfJs8",
  authDomain: "omoola.firebaseapp.com",
  projectId: "omoola",
  storageBucket: "omoola.firebasestorage.app",
  messagingSenderId: "274188055038",
  appId: "1:274188055038:web:b3c98da8b560e72c55d0af"
};

// Cloudinary Configuration
const cloudinaryConfig = {
    cloudName: "dwxr7rbru",
    uploadPreset: "omoola_preset"
};

// Export configurations
window.firebaseConfig = firebaseConfig;
window.cloudinaryConfig = cloudinaryConfig;
