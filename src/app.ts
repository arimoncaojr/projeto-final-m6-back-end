import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import { userRoutes } from "./routes/users.routes";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);

app.use(handleError);

export default app;
