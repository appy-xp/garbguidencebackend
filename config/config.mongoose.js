import mongoose from "mongoose";
import { DB_NAME, remote_DB_NAME } from "../config/index.js";

const connectDB = async () => {
  // const dbURI = `${process.env.DB_TYPE}${process.env.DB_URL}`;
  // const dbURI1 = process.env.DB_TYPE + process.env.REMOTE_URL + "/" + DB_NAME;
  // const dbURI2 = process.env.DB_TYPE + process.env.REMOTE_URL2 + "/" + DB_NAME;
  const dbURI1 =
    "mongodb+srv://shankarpaudel1994:mbgVcTzngb2DP32f@cluster0.pbyrb8j.mongodb.net/garment";
  const dbURI2 =
    "mongodb+srv://shankarpaudel1994:mbgVcTzngb2DP32f@cluster1.57vcfb1.mongodb.net/garment";
  console.log(dbURI1);
  try {
    const connection1 = await mongoose.connect(dbURI1);
    // const connection2 = await mongoose.createConnection(dbURI2).asPromise();
    console.log(
      `\n MongoDB connected !! DB HOST: ${connection1.connection.host}`
    );
    // return { connection1, connection2 };
  } catch (err) {
    console.log("mongodb connection failed: ", err);
    process.exit(1);
  }
};
// const connectDB = async (url, db) => {
//   try {
//     const connection = await mongoose.connect(`${url}/${db}`);
//     console.log(
//       `\n MongoDB connected !! DB HOST: ${connection.connection.host}`
//     );
//   } catch (err) {
//     console.log("mongodb connection failed: ", err);
//     process.exit(1);
//   }
// };

export default connectDB;
// const connection = async () => {
//   let dbs = [];
//   dbs["db1"] = await connectDB(process.env.DB_URL, DB_NAME);
//   dbs["db2"] = await connectDB(process.env.DB_URL, remote_DB_NAME);
//   return dbs;
// };
// export default connection;
