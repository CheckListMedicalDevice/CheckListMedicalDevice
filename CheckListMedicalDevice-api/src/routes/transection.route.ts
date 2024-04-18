import { Router } from "express";
import fire_transection from "../controllers/fire_transection.controller";

const router = Router();

router.get(
    '/',
    fire_transection.generateFireTransections
);
router.get(
    '/generatetransections', fire_transection.generateFireTransections
)

export default router;
