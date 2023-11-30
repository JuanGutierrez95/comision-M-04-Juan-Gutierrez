const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const mongodb = async () => {
  try {
    console.log("Connecting to the database... 🔄");
    await mongoose.connect(MONGO_DB_URI);
    console.log("Database connected ✨");
  } catch (error) {
    console.log("Error connecting to the database ❌", error);
  }
};

module.exports = mongodb;
