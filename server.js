import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import contactRouter from "./routes/Contact.js";
import { config } from 'dotenv';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin:true,
  methods:["POST", "GET", "DELETE", "PUT"],
  credentials:true
}))

config({path:'.env'})

mongoose
  .connect(
    process.env.MONGO_URL,
    {
      dbName: "Contact_API",
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// User router
app.use("/api/user", userRouter);

// Contact router
app.use("/api/contact", contactRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
