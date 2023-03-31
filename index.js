import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import db from "./config/Database.js";

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MenuRoute from "./routes/MenuRoute.js";
import MenuCategoryRoute from "./routes/MenuCategoryRoute.js";
import BlogCategoryRoute from "./routes/BlogCategoryRoute.js";
import BlogRoute from "./routes/BlogRoute.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3006", "http://localhost:3000"],
  })
);

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(MenuRoute);
app.use(MenuCategoryRoute);
app.use(BlogCategoryRoute);
app.use(BlogRoute);

app.listen(process.env.APP_PORT, () => console.log("Server up and Running"));
// store.sync();
