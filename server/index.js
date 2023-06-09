require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRouter = require('./router/auth');

const PORT = process.env.PORT || 5_000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});

    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} port!`);
    });
  } catch (error) {}
};

start();
