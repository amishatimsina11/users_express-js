import express from 'express';
import connectDB from './config/database.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import verifyToken from './middlewares/tokens.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false 
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/', dashboardRoutes);


// app.use(authRoutes());
// app.use(uploadRoutes());
// app.use(dashboardRoutes());

// Home route
app.get("/", verifyToken, (req, res) => {
    res.send(" Home Page ");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening at Port http://localhost:${PORT}`);
});