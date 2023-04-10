import { Router } from "express";
import { createAccount, getAccounts } from "../controllers/accounts.controller.js";
import { auth } from "../middleware/Auth.token.js";

const router = Router();

router.post('/add_account', auth, createAccount);
router.get('/get_accounts', auth, getAccounts);

export default router;