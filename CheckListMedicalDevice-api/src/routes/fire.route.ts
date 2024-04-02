import { Router } from "express";
import fireController from "../controllers/fire.controller";
import accessPermissionMiddleware from "../middlewares/accessPermission.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
router.post('/createFireExtinguisher',fireController.createFireExtinguisher);
router.get("/getFireExtinguisher",  fireController.getFireExtinguisher);
router.get('/getFireExtinguisherById',  fireController.getFireExtinguisherById);

router.get(
    '/',
    fireController.getFireExtinguisher
);

router.get(
    '/:id',
    fireController.getFireExtinguisherById
);

router.put(
    '/:id',
    fireController.updateFireExtinguisher
);

router.delete(
    "/:id", 

    fireController.deleteFireExtinguisher
    );

export default router;