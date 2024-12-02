import express from "express";
import {
  getLeaderboards,
  createLeaderboard,
  getLeaderboard,
  updateLeaderboard,
  deleteLeaderboard,
} from "../controllers/leaderboards.js";

const router = express.Router();

router.route("/").get(getLeaderboards).post(createLeaderboard);
router.route("/:id").get(getLeaderboard).put(updateLeaderboard).delete(deleteLeaderboard);

export default router;