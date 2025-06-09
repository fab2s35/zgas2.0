// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import customersRoutes from "./src/routes/customers.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewRoutes from "./src/routes/reviews.js";
import registerEmployesRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registerClient from "./src/routes/registerClients.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import blogRoutes from "./src/routes/blog.js";
import faqsRoutes from "./src/routes/faqs.js"
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
import cors from "cors"

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";


// Creo una constante que es igual a la libreria que importé
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    // Permitir envío de cookies y credenciales
    credentials: true
  })
);

//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());

//Traemos el archivo json
const swaggerDocument = JSON.parse(
  fs.readFileSync(
    path.resolve("./documentacion.json"),
    "utf-8"
  )
)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir las rutas de las funciones que tendr á la página web
app.use("/api/products",validateAuthToken([ "Admin", "employee"]), productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee",  validateAuthToken([ "Admin", "employee"]), employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/registerEmployees",validateAuthToken([ "Admin"]), registerEmployesRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);

app.use("/api/registerClients", registerClient);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

app.use("/api/blog", blogRoutes);
app.use("/api/faqs", faqsRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
