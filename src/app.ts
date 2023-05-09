import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import { userRoutes } from "./routes/users.routes";
import cors from "cors";
import { sessionRoutes } from "./routes/sessions.routes";
import { postsRoutes } from "./routes/posts.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/posts", postsRoutes);

app.use(handleError);

export default app;
