import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route";
import fireRoutes from "./routes/fire.route";
import transectionRoutes from "./routes/transection.route";
import deviceRoutes from "./routes/device.route";
import toolsRoutes from "./routes/tools.route.";
import deviceSectionRoutes from "./routes/deviceSection.route";
import devicetransectionRoutes from "./routes/device_transection";
import { sequelize } from "./config/database";
import fire_transectionController from "./controllers/fire_transection.controller";
import device_transectionController from "./controllers/device_transection.controller";

const cron = require('node-cron');


dotenv.config()
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("api is ready!!!");
})



app.use("/users", userRoutes);
app.use("/fireExtinguisher", fireRoutes)
app.use("/transection", transectionRoutes);
app.use("/tools", toolsRoutes)
app.use("/device", deviceRoutes)
app.use("/deviceSections", deviceSectionRoutes); 
app.use("/devicetransection",devicetransectionRoutes)

// cron.schedule(
//   "*/2 * * * *",
//   async() => {
//     await device_transectionController.generateDeviceTransections();
//   },
//   {
//     timezone: "Asia/Bangkok",
//   }
// );

// cron.schedule(
//   "*/2 * * * *",
//   async() => {
//     await fire_transectionController.generateFireTransections();
//   },
//   {
//     timezone: "Asia/Bangkok",
//   }
// );

  // cron.schedule(
  //   "*/10 * * * * *",
  //   async() => {
  //     await fire_transectionController.generateFireTransections();
  //   },
  //   {
  //     timezone: "Asia/Bangkok",
  //   }
  // );

// app.use("/device", deviceRoutes)

app.listen(process.env.PORT!, async () => {
  await sequelize.sync();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
