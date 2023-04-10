import { Router } from "express";
import { checkToken } from "../controllers/checkToken.controller.js";
import { Register, Login } from "../controllers/users.controller.js";
import { auth } from "../middleware/Auth.token.js";

const router = Router()

router.post('/register', Register);
router.post('/login', Login);
router.post('/checkToken', auth, checkToken);

export default router;