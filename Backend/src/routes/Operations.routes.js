import { Router } from "express";
import { addIncome, addExpense, getHistory } from "../controllers/operations.controller.js";
import { auth } from "../middleware/Auth.token.js";

const router = Router();

router.post('/add_income', auth, addIncome);
router.post('/add_expense', auth, addExpense);
router.get('/get_history', auth, getHistory);

export default router;
