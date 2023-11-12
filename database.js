const mongoose = require("mongoose");

const user = 'gaurav_123';
const password = 'gaurav@123'
const MONGO_URI = "mongodb+srv://gaurav_123:gaurav123@cluster0.h11zu.mongodb.net/restorantDB?retryWrites=true&w=majority"


const connectDB = () => {
  mongoose
    .connect(MONGO_URI.replace('<username>', user).replace('<password>', password))
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = { connectDB };
