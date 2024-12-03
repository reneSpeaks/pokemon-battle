import express from "express";
import {
  getRosters,
  createRoster,
  getRoster,
  updateRoster,
  deleteRoster,
} from "../controllers/rosters.js";

const router = express.Router();

router.route("/").get(getRosters).post(createRoster);
router.route("/:id").get(getRoster).put(updateRoster).delete(deleteRoster);

export default router;