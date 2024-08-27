import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected: ${con.connection.host}`);
    
  } catch (error) {
    console.log(`Error: connecting to mongoDB ${error.message}`);
    process.emit(1); // status code 1 means: failure,
  }
};
