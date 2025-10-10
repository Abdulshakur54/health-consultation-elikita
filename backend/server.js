import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { authRouter } from "./routes/authRoute.js";
import { consultationRouter } from "./routes/consultationRouter.js";
import { verifyToken } from "./middlewares/auth.js";
import { userRouter } from "./routes/userRoute.js";
import { passwordRecoveryRouter } from "./lib/passwordRecovery.js";
import swaggerUi from 'swagger-ui-express';
import getSwaggerSpec from './swagger.js';


const app = express();
app.use(express.json({ limit: "4mb" }));
app.use(cors());

await connectDB();

app.get("/api/v1/status", (req, res) => {
  res.send("Server is live");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/consultations", verifyToken, consultationRouter);
app.use("/api/v1/users", verifyToken, userRouter);
app.use("/api/v1/password-recovery", passwordRecoveryRouter);


const swaggerHandler = (req, res, next) => {
  const serverUrl = `${req.protocol}://${req.get('host')}`;
  const swaggerSpec = getSwaggerSpec(serverUrl);
  return swaggerUi.setup(swaggerSpec)(req, res, next);
};

app.use('/api-docs', swaggerUi.serve, swaggerHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
