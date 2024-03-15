import mongoose from "mongoose";
import { DB_NAME } from "../config/index.js";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connection.connection.host}`
    );
  } catch (err) {
    console.log("mongodb connection failed: ", err);
    process.exit(1);
  }
};

export default connectDB;
