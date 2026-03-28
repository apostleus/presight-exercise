import { Router } from "express";
import { randomUUID } from "crypto";
import { enqueueJob } from "../services/jobQueue.js";

const router = Router();

router.post("/", (req, res) => {
    const id = randomUUID();
    enqueueJob(id);
    res.json({ id, status: "pending" });
});

export default router;
