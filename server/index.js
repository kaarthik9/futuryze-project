import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import contactRoutes from "./routes/contacts.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/contacts", contactRoutes);
app.use("/users", userRoutes);

// Using mongoose Altas as DB
const CONNECTION_URL =
  "mongodb+srv://kaarthik9:kaarthik9@cluster0.y53ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("listening on port " + PORT)))
  .catch((err) => console.log(err));
