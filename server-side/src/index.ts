import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  return console.log(`Listening on Port: ${PORT}`);
});

const supabase = createClient(
  process.env.PROJECT_ID || "YOUR_PROJECT_URL",
  process.env.API_KEY || "YOUR_API_KEY"
);

// GET Current Quiz Question Data
app.get("/api/collections/quiz/:id", async (request, response) => {
  const { id } = request.params;

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
