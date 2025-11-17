// Admin Authentication JavaScript
// Demo admin credentials (for development - in production, verify against Firestore)
const DEMO_ADMIN = {
    email: 'admin@omoola.com',
    password: 'admin123'
};

// Admin Login Form Handler
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        try {
            // For demo purposes, check against hardcoded admin credentials
            if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
                // Store admin session
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminEmail', email);
                
                if (window.showNotification) {
                    window.showNotification('Admin login successful! Redirecting to dashboard...');
                }
                
                // Redirect to Admin Dashboard
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1500);
            } else {
                // Try Firebase authentication as fallback (if available)
                try {
                    const { auth, db } = await import('./firebase-config.js');
                    const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
                    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
                    
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    
                    // Check if user has admin role in Firestore
                    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
                    
                    if (userDoc.exists() && userDoc.data().role === 'admin') {
                        // Store admin session
                        sessionStorage.setItem('adminLoggedIn', 'true');
                        sessionStorage.setItem('adminEmail', email);
                        sessionStorage.setItem('adminUid', userCredential.user.uid);
                        
                        if (window.showNotification) {
                            window.showNotification('Admin login successful! Redirecting to dashboard...');
                        }
                        
                        // Redirect to Admin Dashboard
                        setTimeout(() => {
                            window.location.href = 'admin.html';
                        }, 1500);
                    } else {
                        throw new Error('Unauthorized: Admin access required');
                    }
                } catch (firebaseError) {
                    throw new Error('Invalid credentials');
                }
            }
            
        } catch (error) {
            console.error('Admin login error:', error);
            let errorMessage = 'Admin login failed. Please check your credentials.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No admin account found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (error.message.includes('Unauthorized')) {
                errorMessage = 'Access denied. Admin privileges required.';
            } else if (error.message.includes('Invalid credentials')) {
                errorMessage = 'Invalid email or password.';
            }
            
            if (window.showNotification) {
                window.showNotification(errorMessage, 'error');
            } else {
                alert(errorMessage);
            }
        }
    });
}

console.log('Admin authentication module loaded');
