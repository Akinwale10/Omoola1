// Auth Page JavaScript with Firebase
import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Tab switching
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Update active tab
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active form
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${tabName}Form`) {
                form.classList.add('active');
            }
        });
    });
});

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            window.showNotification('Login successful! Welcome back.');
            
            // Redirect to shop or dashboard
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1500);
            
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please check your credentials.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            }
            
            window.showNotification(errorMessage, 'error');
        }
    });
}

// Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            window.showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Validate password strength
        if (password.length < 6) {
            window.showNotification('Password must be at least 6 characters long.', 'error');
            return;
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with name
            await updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`
            });
            
            window.showNotification('Registration successful! Welcome to Omoola Pharmacy.');
            
            // Redirect to shop
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1500);
            
        } catch (error) {
            console.error('Registration error:', error);
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'An account with this email already exists.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please choose a stronger password.';
            }
            
            window.showNotification(errorMessage, 'error');
        }
    });
}

// Check for redirect result on page load
getRedirectResult(auth)
    .then((result) => {
        if (result && result.user) {
            window.showNotification(`Welcome, ${result.user.displayName}!`);
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1500);
        }
    })
    .catch((error) => {
        console.error('Redirect result error:', error);
        handleGoogleAuthError(error);
    });

// Helper function to handle Google authentication errors
function handleGoogleAuthError(error) {
    console.error('Google sign-in error:', error);
    let errorMessage = 'Google sign-in failed. Please try again.';
    
    switch (error.code) {
        case 'auth/popup-blocked':
            errorMessage = 'Popup was blocked by your browser. Please allow popups for this site and try again.';
            break;
        case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in was cancelled. Please try again.';
            break;
        case 'auth/cancelled-popup-request':
            // User cancelled, no need to show error
            return;
        case 'auth/unauthorized-domain':
            errorMessage = 'This domain is not authorized for Google Sign-In. Please contact support.';
            break;
        case 'auth/operation-not-allowed':
            errorMessage = 'Google Sign-In is not enabled. Please contact support.';
            break;
        case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
            break;
        case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection and try again.';
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Too many unsuccessful attempts. Please try again later.';
            break;
    }
    
    window.showNotification(errorMessage, 'error');
}

// Helper function to disable button and show loading state
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Signing in...';
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || 'Google';
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }
}

// Google Sign In with popup and redirect fallback
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const provider = new GoogleAuthProvider();
        // Add custom parameters for better UX
        provider.addScope('profile');
        provider.addScope('email');
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        setButtonLoading(btn, true);
        
        try {
            // Try popup first
            const result = await signInWithPopup(auth, provider);
            window.showNotification(`Welcome, ${result.user.displayName}!`);
            
            // Redirect to shop
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1500);
            
        } catch (error) {
            setButtonLoading(btn, false);
            
            // If popup was blocked, try redirect method
            if (error.code === 'auth/popup-blocked') {
                window.showNotification('Popup blocked. Redirecting to Google Sign-In...', 'info');
                
                setTimeout(() => {
                    signInWithRedirect(auth, provider).catch((redirectError) => {
                        console.error('Redirect error:', redirectError);
                        handleGoogleAuthError(redirectError);
                    });
                }, 1000);
            } else {
                handleGoogleAuthError(error);
            }
        }
    });
});
