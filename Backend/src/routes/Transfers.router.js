import { Router } from "express";
import { addTransfer, addExchangeUsd, addExchangeVef } from "../controllers/transfers.controller.js";
import { auth } from "../middleware/Auth.token.js";

const router = Router();

router.post('/add_transfer', auth, addTransfer);
router.post('/add_exchange_usd', auth, addExchangeUsd);
router.post('/add_exchange_vef', auth, addExchangeVef);

export default router;