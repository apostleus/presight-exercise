import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

router.get("/", (req, res) => {
    const text = faker.lorem.paragraphs(32);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");

    let i = 0;
    const CHUNK_SIZE = 50;
    const INTERVAL_MS = 30;

    const interval = setInterval(() => {
        if (i >= text.length) {
            clearInterval(interval);
            res.end();
            return;
        }
        res.write(text.slice(i, i + CHUNK_SIZE));
        i += CHUNK_SIZE;
    }, INTERVAL_MS);

    req.on("close", () => clearInterval(interval));
});

export default router;
