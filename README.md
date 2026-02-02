# Omoola Pharmacy & Stores

A premium e-commerce website for medicines, groceries, and health products with elegant design inspired by professional service business aesthetics.

## 🌟 Features

### Customer-Facing Features
- **Elegant Homepage** - Hero section with value propositions, featured products, categories, testimonials, and newsletter signup
- **About Us** - Company story, mission/vision, core values, team members, and trust badges
- **Services** - Detailed service offerings with professional layout
- **Shop/Catalogue** - Product grid with filters (category, price), search, and sorting functionality
- **Shopping Cart** - Full cart management with quantity controls, order summary, and checkout flow
- **Contact Page** - Contact form with location information and embedded map
- **Authentication** - Firebase-powered login/registration with Google Sign-In

### Admin Dashboard
- **Dashboard** - Sales overview, statistics, and recent orders
- **Product Management** - View, add, edit, and delete products
- **Order Management** - Track and update order statuses
- **User Management** - View customer information and roles
- **Analytics** - Sales charts and top products (expandable with Chart.js)

## 🎨 Design Philosophy

The site follows a refined, service-business aesthetic with:
- Clean, classy layout with ample whitespace
- Subtle color palette (greens, golds, neutrals)
- Elegant typography (Cormorant Garamond + Lato)
- Smooth transitions and hover effects
- Professional trust-building elements
- Mobile-responsive design

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: Firebase Authentication (Email/Password + Google)
- **Database**: Firebase Firestore (ready for implementation)
- **Storage**: Cloudinary (configured for product images)
- **Fonts**: Google Fonts (Cormorant Garamond, Lato)
- **Images**: Unsplash API for high-quality photos
- **Icons**: Custom SVG icons

## 📦 Firebase Configuration

The project is configured with Firebase:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA97xqLri9R7Z7NULITp9DsOSdLfCxfJs8",
  authDomain: "omoola.firebaseapp.com",
  projectId: "omoola",
  storageBucket: "omoola.firebasestorage.app",
  messagingSenderId: "274188055038",
  appId: "1:274188055038:web:b3c98da8b560e72c55d0af"
};
```

## 📁 Project Structure

```
Omoola1/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── shop.html               # Product catalogue
├── cart.html               # Shopping cart
├── contact.html            # Contact page
├── login.html              # Authentication
├── admin.html              # Admin dashboard
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── about.css           # About page styles
│   ├── services.css        # Services page styles
│   ├── shop.css            # Shop page styles
│   ├── cart.css            # Cart page styles
│   ├── contact.css         # Contact page styles
│   ├── auth.css            # Authentication styles
│   └── admin.css           # Admin dashboard styles
└── js/
    ├── firebase-config.js  # Firebase initialization
    ├── main.js             # Core functionality
    ├── shop.js             # Shop/product filtering
    ├── cart.js             # Cart management
    ├── contact.js          # Contact form
    ├── auth.js             # Authentication
    └── admin.js            # Admin dashboard
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akinwale10/Omoola1.git
   cd Omoola1
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process required - pure HTML/CSS/JS

3. **For development**
   - Use a local server (e.g., Live Server in VS Code)
   - This helps with CORS issues when testing locally

## 🔐 Authentication

The site uses Firebase Authentication with:
- Email/Password registration and login
- Google Sign-In integration with popup and redirect fallback
- Comprehensive error handling
- Password strength validation
- Secure session management

**⚠️ Important**: To enable Google Sign-In, you must configure Firebase properly. See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed setup instructions.

### Google Sign-In Features:
- ✅ Popup-based authentication (primary)
- ✅ Automatic fallback to redirect method if popup is blocked
- ✅ User-friendly error messages
- ✅ Loading states during authentication
- ✅ Account selection prompt

## 🛒 Shopping Features

- **24 Sample Products** across categories:
  - Medicines
  - Health Supplements
  - Groceries
  - Personal Care

- **Shopping Cart**:
  - Local storage persistence
  - Quantity management
  - Real-time total calculation
  - Free shipping over £50

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🎯 Key Pages

1. **Homepage** (`index.html`)
   - Hero with call-to-action
   - Value propositions
   - Featured products
   - Category showcase
   - Customer testimonials
   - Newsletter signup

2. **Shop** (`shop.html`)
   - Product grid
   - Category filters
   - Price range filters
   - Search functionality
   - Sort options

3. **Admin** (`admin.html`)
   - Protected dashboard
   - Product management
   - Order tracking
   - User management
   - Analytics overview

## 🔄 Future Enhancements

- [ ] Complete checkout process with payment integration
- [ ] Product detail pages with reviews
- [ ] Advanced search with autocomplete
- [ ] Wishlist functionality
- [ ] Order tracking for customers
- [ ] Email notifications
- [ ] Prescription upload feature
- [ ] Multi-language support
- [ ] Chart.js integration for analytics
- [ ] Cloudinary image uploads in admin

## 📝 License

Copyright © 2024 Omoola Pharmacy & Stores. All rights reserved.

## 👥 Contact

- **Address**: 3, Isaga Bus Stop, Opposite The Gem International School, Owode Yewa, Ogun State.
- **Phone**: +234 800 000 0000
- **Email**: info@omoola.com

---

Built with 💚 for better healthcare accessibility
