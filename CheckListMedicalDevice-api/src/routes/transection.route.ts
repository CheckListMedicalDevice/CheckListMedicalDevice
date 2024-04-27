import { Router } from "express";
import fire_transection from "../controllers/fire_transection.controller";

const router = Router();

router.get(
    '/',
    fire_transection.getBillFireExtingruisher
);

router.get(
    '/getbillfireextingruisher', fire_transection.getBillFireExtingruisher
)


router.get(
    '/generatetransections', fire_transection.generateFireTransections
)

router.get('/getbillbyadmin', fire_transection.getBillsByAdmin)

router.put('/:id', fire_transection.updateFireExtinguisherTransection)

export default router;
