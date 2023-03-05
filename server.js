require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    console.log("DTABASE CONNECTION SUCCESSFULLY");
  })
  .catch((error) => {
    console.error("EROOR");
  });

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.on("close", () => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});
