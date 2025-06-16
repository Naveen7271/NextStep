import express from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/addjob", createJob);
router.get("/jobs", getJobs);
router.put("/updatejob/:id", updateJob);
router.delete("/deletejob/:id", deleteJob);

export default router;