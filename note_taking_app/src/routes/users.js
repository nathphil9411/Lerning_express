import { Router } from "express";

const router = Router();

router.get("/api/users", (req, res) => {
	res.send("just tutorials");
});

export default router;
