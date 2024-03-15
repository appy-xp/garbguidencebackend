import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/config.mongoose.js";
import AppRouting from "./routing/appRouting.js";

dotenv.config({
  path: "./.env",
});
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

connectDB()
  .then(() => {
    // app.on("error", (error) => {
    //   console.log("App on error: ", error);
    //   throw error;
    // });
    app.listen(process.env.PORT, () => {
      console.log(`app listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb correction failed !!!", err);
  });

AppRouting(app);
