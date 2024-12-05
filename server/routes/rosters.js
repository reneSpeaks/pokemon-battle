import express from "express";
import {
  getRosters,
  createRoster,
  getRoster,
  updateRoster,
  deleteRoster,
  getRosterByUserId ,
  updateRosterByUserId,
} from "../controllers/rosters.js";

const router = express.Router();

router.route("/").get(getRosters).post(createRoster);
router.route("/:id").get(getRoster).put(updateRoster).delete(deleteRoster);
// router.route("/user/:userId").get(getRosterByUserId).put(updateRosterByUserId);;
// http://localhost:3001/rosters/user/675029271dcee3215b59d153

router.route("/by-user/:userId").get(getRosterByUserId).put(updateRosterByUserId);;
// http://localhost:3001/rosters/by-user/675029271dcee3215b59d153


export default router;

