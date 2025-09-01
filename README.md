# Full-Stack Authentication System

A complete authentication system built with modern technologies including user registration, login, email verification, password reset, and protected routes.

## 🚀 Tech Stack

### Backend
- **Node.js** + **TypeScript** + **Express.js**
- **MongoDB** database with **Mongoose ODM**
- **JWT** (access & refresh tokens) for authentication
- **bcrypt** for password hashing
- **Email verification** and **password reset** via email
- **Security**: helmet, cors, rate limiting, input sanitization
- **Testing**: Jest with supertest
- **Validation**: Zod schemas

### Frontend  
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Redux Toolkit** for state management
- **Axios** with interceptors for API calls
- **Responsive design** with loading states

### DevOps
- **Docker** + **Docker Compose** for containerization
- **ESLint** + **Prettier** for code quality
- Environment configuration with **dotenv**

## 📁 Project Structure

```
auth-system/
├── backend/                 # Node.js + TypeScript backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── models/             # MongoDB models & schemas
│   ├── tests/              # Jest tests
│   └── Dockerfile          # Backend container
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store & slices
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # API utilities
│   └── Dockerfile          # Frontend container
└── docker-compose.yml     # Full stack orchestration
```

## 🛠️ Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone and setup**:
   ```bash
   git clone <repo-url>
   cd auth-system
   ```

2. **Configure environment** (copy and edit):
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start all services**:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:27017

### Option 2: Local Development

#### Prerequisites
- Node.js 18+
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

#### Backend Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and email settings
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env if needed (API URL)
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

## 🔧 Environment Configuration

### Backend (.env)
```bash
# Server Configuration
PORT=4000
MONGODB_URI=mongodb://localhost:27017/authdb

# JWT Secrets (MUST CHANGE - Generate random strings)
JWT_SECRET=your_super_secret_jwt_key_CHANGE_THIS
JWT_REFRESH_SECRET=your_super_secret_refresh_key_CHANGE_THIS

# Email Configuration (Replace with your email settings)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com              # Your actual Gmail
EMAIL_PASS=your_app_password                 # Your Gmail App Password
EMAIL_FROM=no-reply@yourdomain.com           # Your sender email

# Frontend URL
CLIENT_URL=http://localhost:3000
```

**⚠️ IMPORTANT**: 
- Generate strong JWT secrets using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- For Gmail: Enable 2FA and create an App Password
- Never commit your actual `.env` file to Git

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:4000
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/verify-email/:token` - Email verification
- `POST /auth/request-password-reset` - Request password reset
- `POST /auth/reset-password/:token` - Reset password

### Protected Routes
- `GET /profile` - Get user profile (requires authentication)

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Run Specific Test Files
```bash
npm test auth.test.ts
```

## 🚢 Production Deployment

### Using Docker Compose
```bash
# Build and start production containers
docker-compose up -d --build
```

### Manual Deployment
1. Set production environment variables
2. Build frontend: `npm run build`
3. Build backend: `npm run build` 
4. Start services with process manager (PM2, etc.)

## 🔒 Security Features

- **JWT Authentication** with access & refresh tokens
- **Password hashing** with bcrypt
- **Email verification** before account activation
- **Password reset** with secure tokens
- **Rate limiting** to prevent abuse
- **Input sanitization** against XSS
- **CORS** configuration
- **Helmet** for security headers
- **Cookie security** with httpOnly flags

## 🎯 Features

### Core Authentication
- ✅ User registration with email verification
- ✅ Secure login/logout
- ✅ JWT-based authentication
- ✅ Password reset via email
- ✅ Protected routes and middleware

### Frontend Features
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Automatic token refresh
- ✅ Route protection and redirects

### Developer Experience
- ✅ TypeScript for type safety
- ✅ ESLint + Prettier for code quality
- ✅ Hot reload in development
- ✅ Comprehensive testing
- ✅ Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running
- Verify MONGODB_URI in .env
- Check database credentials

### Email Issues
- Configure SMTP settings in .env
- For Gmail, use App Passwords
- Check firewall/network settings

### Frontend Build Issues
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify environment variables

### Common Errors
- **Port already in use**: Change PORT in .env
- **JWT errors**: Verify JWT_SECRET is set
- **CORS errors**: Check CLIENT_URL configuration
