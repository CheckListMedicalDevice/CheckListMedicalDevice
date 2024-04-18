import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route";
import fireRoutes from "./routes/fire.route";
import transectionRoutes from "./routes/transection.route";
import deviceRoutes from "./routes/device.route";

import { sequelize } from "./config/database";


dotenv.config()
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello")
})



app.use("/users", userRoutes);
app.use("/fireExtinguisher", fireRoutes)
app.use("/transection", transectionRoutes)

// app.use("/device", deviceRoutes)

app.listen(process.env.PORT!, async () => {
  await sequelize.sync();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
