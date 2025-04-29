const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authrote');
const userRoutes = require('./routes/userroutes');
const storeRoutes = require('./routes/storeroutes');
const ratingRoutes = require('./routes/ratingroutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
