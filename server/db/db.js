const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDb...`);
  } catch (err) {
    console.log(`MongoDb connection failed: ${err}`);
  }
};

module.exports = connectDb;
