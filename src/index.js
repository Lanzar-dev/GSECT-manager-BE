import dotenv from "dotenv";
import app from "./server.js";

// import dbConnection from './database/db.js';
import { connectDB } from "./database/db.js";
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 7000;

// dbConnection.getConnect();
connectDB();

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});
