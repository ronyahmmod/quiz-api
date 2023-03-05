const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");

const quizRouter = require("./routes/quizRoutes");
const questionRouter = require("./routes/questionRoutes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windoMs: 60 * 60 * 1000,
  message: "Too many request from this IP, Please try again in an hour.",
});
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(helmet());
app.use(xss());
app.use("/api", limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantiry",
      "ratingsAverage",
      "difficulty",
      "maxGroupSize",
      "price",
    ],
  })
);

app.get("/", (req, res) => {
  res.status(200).render("base.pug", { title: "Hi" });
});

app.use("/api/v1/quizes", quizRouter);
app.use("/api/v1/questions", questionRouter);

module.exports = app;
