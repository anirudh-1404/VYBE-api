import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectdb } from "./utils/db.js";

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["get", "post", "put", "patch", "delete"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", productRouter);

connectdb();

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
