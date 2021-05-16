import { Router } from "express";
import { signIn, signUp } from "../../controllers/api/auth.controller";
import { verifyUser } from "../../middlewares/auth";

const router = Router();

router.post("/signin", signIn);

router.post("/signup", verifyUser, signUp);

export default router;
