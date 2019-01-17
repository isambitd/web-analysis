process.env.NODE_ENV = "development";
global.__base = __dirname + "/";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import http from "http";
import config from "./config.json";
import routes from "./routes";
import handleErrors from "./errors";

const normalizePort = val => {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
  },
  //On Error this method will handle all the errors and based on the error it will log
  onError = error => {
    if (error.syscall !== "listen") throw error;
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  },
  //If server is running successfully this callb ack will be called
  onListening = () => {
    let addr = server.address();
    console.log(
      "Express server listening on host %s and port %d, in dev mode",
      addr.address,
      addr.port
    );
  };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

let port = normalizePort(config.nodeServer.port);
//Configuring host and port to the Node App
app.set("port", port);
app.set("host", config.nodeServer.host);

//Serving staic html file from www folder
app.use(express.static(__base + "../www"));

//Pointing to the routes -> index.js
app.use("/api", routes);
app.use(handleErrors);

//Finally the server is getting created and all the listerners are attached
let server = http.createServer(app);
server.listen(port, config.nodeServer.host);
server.on("error", onError);
server.on("listening", onListening);
