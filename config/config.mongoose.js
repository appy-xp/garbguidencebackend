import mongoose from "mongoose";
import { DB_NAME, remote_DB_NAME } from "../config/index.js";

const connectDB = async () => {
  try {
    const connection1 = await mongoose.connect(remote_DB_NAME);

    const session = await connection1.startSession();
    console.log(`\n MongoDB connected !! DB HOST: ${remote_DB_NAME}`);
    // console.log("session>>", session);
  } catch (err) {
    console.log("mongodb connection failed: ", err);
    process.exit(1);
  }
};

export default connectDB;
