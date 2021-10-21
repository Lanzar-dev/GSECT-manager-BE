import express from "express";
import cors from "cors";
// import router from "./routes/router.js";
import userRoutes from "./routes/userRoutes.js";
import privateRoute from "./routes/privateRoute.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Just for testing
app.get('/', (req, res) => {
    res.json({
    status: 'success',
    message: 'Welcome to our GSECT-MAMAGER App.',
    });
});

app.use("/api/users", userRoutes);

//Checking out Protected route for only auth users
app.use("/api/private", privateRoute);

// app.use(router);
app.use(errorHandler);

export default app