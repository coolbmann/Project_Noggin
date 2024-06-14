import { Router, Request, Response, response } from "express";
import { createUser, getTopUser, getUserOverview } from "../repositories/users";
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

router.get("/api/user/topuser", async (req: Request, res: Response) => {
  try {
    const response = await getTopUser();
    res.send(response[0].username);
  } catch (error) {
    res.status(500).send("Error in fetching data");
  }
});

export default router;
