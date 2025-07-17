# Food Delivery App

A modern, responsive food delivery web application built with React 19, TypeScript, and Firebase. This application provides a seamless user experience for browsing menus, managing shopping carts, and placing orders.

## 🚀 Features

- **User Authentication**: Secure login and registration system with Firebase Auth
- **Menu Browsing**: Interactive menu with categorized food items
- **Shopping Cart**: Add/remove items, quantity management, and real-time cart updates
- **Responsive Design**: Mobile-first design that works across all devices
- **Modern UI**: Clean, intuitive interface with styled-components
- **State Management**: Efficient state management with Redux Toolkit
- **Type Safety**: Full TypeScript support for better development experience
- **Testing**: Comprehensive test suite with Jest and React Testing Library

## 🛠️ Technologies Used

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Styled Components** - CSS-in-JS styling solution
- **React Router** - Client-side routing
- **Redux Toolkit** - State management

### Backend & Database
- **Firebase** - Authentication and database services

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ReactWebDevHW
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎯 Usage

### For Users
1. **Browse Menu**: Navigate through different food categories
2. **Add to Cart**: Click on menu items to add them to your cart
3. **Manage Cart**: Adjust quantities or remove items from the cart page
4. **Authentication**: Sign up or log in to access protected features
5. **Place Orders**: Complete your order through the cart system

### For Developers
- Use `npm run dev` for development with hot reloading
- Run `npm test` to execute the test suite
- Use `npm run build` to create a production build
- Run `npm run lint` to check code quality
- Use `npm run format` to format code with Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Custom button component
│   ├── CartItem/       # Shopping cart item component
│   ├── MenuCard/       # Menu item display component
│   ├── Navbar/         # Navigation component
│   └── ...            # Other components
├── pages/              # Application pages/routes
│   ├── HomePage/       # Landing page
│   ├── MenuPage/       # Menu browsing page
│   ├── CartPage/       # Shopping cart page
│   ├── LoginPage/      # Authentication pages
│   └── ...            # Other pages
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   └── hooks.ts        # Typed hooks
├── firebase/           # Firebase configuration
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets (images, icons)
```

## 🧪 Testing

This project includes comprehensive testing with Jest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test files are located alongside their corresponding components and follow the naming convention `*.test.tsx`.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run test suite

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Set up Firestore Database
4. Add your web app configuration to the `.env` file

### ESLint & Prettier
The project includes pre-configured ESLint and Prettier settings for consistent code quality and formatting.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Ensure all tests pass before submitting
- Follow the existing code style and formatting
- Update documentation as needed

## 📱 Responsive Design

This application is built with mobile-first principles and provides an optimal experience across:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting Platforms
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## 📄 License

This project is created for educational purposes as part of a React Web Development course.

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React and TypeScript
