import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./logger.js";

module.exports = (app) => {
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(
    morgan("common", {
      stream: {
        write: (message) => {
          //logger.log(message);
          logger.info(message.trim());
        },
      },
    })
  );

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static("public"));
};
