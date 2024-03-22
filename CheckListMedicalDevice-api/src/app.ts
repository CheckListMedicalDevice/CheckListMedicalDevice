import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.route";
import { sequelize } from "./config/database";

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!")
})



app.use("/users", userRoutes);

app.listen(process.env.PORT!, async () => {
  await sequelize.sync();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
