require("dotenv").config();
const mongoose = require("mongoose");
const Cat = require("../models/Cat");
const { cats } = require("./cats");

const populateDbWithMockData = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    const productRes = await Cat.create(cats);

    console.log("Database successfully populated with products");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData();