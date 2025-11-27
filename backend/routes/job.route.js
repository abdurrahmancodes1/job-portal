import express from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuthenticated, postJob);
jobRouter.get("/get", isAuthenticated, getAllJobs);
jobRouter.get("/getAdminJobs", isAuthenticated, getAdminJobs);
jobRouter.get("/get/:id", isAuthenticated, getJobById);

export default jobRouter;
