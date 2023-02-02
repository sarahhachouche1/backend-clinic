const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
    } catch (error) {
      console.log(`Error: ${error.message}`.red.underline.bold);
      process.exit(1);
    }
  };
  module.exports= connectDB;