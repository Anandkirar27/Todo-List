const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Set EJS as the view engine
app.set('view engine', 'ejs');
// app.set('views', './views');

// Routes
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.redirect('/tasks');
});

const PORT = 5000 || process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
