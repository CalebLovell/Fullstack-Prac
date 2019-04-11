require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./authCtrl");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port: ${SERVER_PORT}`);
  });
});

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/user-data", authCtrl.userData);
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("http://localhost:3000/#/");
});
