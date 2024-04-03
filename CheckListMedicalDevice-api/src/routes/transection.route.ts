import { Router } from "express";
import transectionController from "../controllers/transection.controller";


const router = Router();

router.post("/createTransection", transectionController.createTransection);

router.get("/getTransection", transectionController.getTransection);

// router.get("/getTransectionById", transectionController.getTransectionById);

router.get(
    "/",
    transectionController.getTransection
);

// router.get(
//     "/:id",
//     transectionController.getTransectionById
// );

router.put(
    "/:id",
    transectionController.updateTransection
);

router.delete(
    "/:id",
    transectionController.deleteTransection
);

export default router;
