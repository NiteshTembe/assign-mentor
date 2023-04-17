
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { mentorsRouter } from "./routes/mentors.js";
import { studentsRouter } from "./routes/students.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//console.log(process.env.MONGO_URL);
const MONGO_URL = process.env.MONGO_URL;

//Mongo connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is Connected");
  return client;
}

export const client = await createConnection();

//interceptor |  converting body to json
app.use(express.json());

//REST API Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to Mentor-Assign API");
});

app.use("/mentors", mentorsRouter);

app.use("/students", studentsRouter);

app.listen(PORT, () => console.log("Server started on the port", PORT));
