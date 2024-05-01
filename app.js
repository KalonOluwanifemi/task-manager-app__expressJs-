const express = require("express");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const app = express();
const tasks = require("./routes/tasks");
app.use(express.json());

const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

//middleWare
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`App is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
