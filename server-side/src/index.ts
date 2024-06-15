import express from "express";
import cors from "cors";
import session, { Session, SessionData } from "express-session";
import { validateUsername } from "./middleware/validateUsername";
import supabase from "./config/supabaseClient";
import usersRouter from "./routes/users";
import quizzesRouter from "./routes/quizzes";
import { errorHandler } from "./middleware/errors";
import config from "../src/config/config";
import MemoryStore from "memorystore";

interface mySessionData extends Session {
  username?: string;
}

const MemoryStoreConstructor = MemoryStore(session);

console.log("session secret is: " + process.env.SESSION_SECRET);

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (config.allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    saveUninitialized: true,
    resave: false,
    cookie: {
      // httpOnly: true,
      maxAge: 86400000,
      // secure: true,
      domain:
        process.env.NODE_ENV === "production"
          ? "https://noggin.onrender.com"
          : undefined,
    },
    store: new MemoryStoreConstructor({
      checkPeriod: 86400000,
    }),
  })
);

app.use(usersRouter);
app.use(quizzesRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  return console.log(`Listening on Port: ${PORT}`);
});

// GET Current Quiz Question Data
app.get("/api/collections/quiz/:id", async (request, response) => {
  const { id } = request.params;

  // Not a good implementation, define in repositories folder
  try {
    const { data, error } = await supabase
      .from(`quizQuestionLink`)
      .select(
        `*, questions(id, question, answer_options, correct_answer, imageurl)`
      )
      .eq("quizId", id);
    return response.json(data);
  } catch (error) {
    return response.status(500);
  }
});

// GET Quiz Card Data
app.get("/api/collections/:category", async (request, response) => {
  const { category } = request.params;

  try {
    const { data, error } = await supabase
      .from(`quiz_card`)
      .select("*")
      .filter("row_num", "eq", 0)
      .filter("collection", "eq", category);
    return response.json(data);
  } catch (error) {
    return response.status(500);
  }
});

// GET Username (Session ID)
app.get("/api/username", validateUsername, (request, response) => {
  const sessionData = request.session as mySessionData;
  return response.send(sessionData.username);
});

app.get("/api/user/userid", async (request, response) => {
  // const data = await getUserOverview();
  response.send(request.sessionID);
});
