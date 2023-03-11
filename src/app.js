require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const catRoutes = require('./routes/catRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`proccessing ${req.method} request to ${req.path}`);
  next();
});

app.use('/api/v1/mycats/carts', cartRoutes);
app.use('/api/v1/mycats/cats', catRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const run = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();