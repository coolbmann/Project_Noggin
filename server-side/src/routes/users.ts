import { Router, request, response } from "express";
import { createUser, getUserOverview } from "../repositories/users";
import { validateUsername } from "../middleware/validateUsername";
import { getAttemptDetails } from "../repositories/quizzes";

const router = Router();

router.post("/api/user", validateUsername, (request, response) => {});

router.get("/api/user/overview", async (request, response) => {
  // const data = await getUserOverview();
  response.send(await getUserOverview());
});

router.get("/api/user/overview/attempts", async (request, response) => {
  response.send(await getAttemptDetails());
});

router.get("/api/user/userid", async (request, response) => {
  response.send(request.sessionID);
});

export default router;
