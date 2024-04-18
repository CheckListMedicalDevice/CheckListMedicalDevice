import { Router } from "express";

import deviceController from "../controllers/device.controller";

const router = Router();

router.post("/createDevice", deviceController.createDevice);

router.get("/getDevice", deviceController.getDevice);

router.get("/getDeviceById", deviceController.getDeviceById);

router.get(
  "/",
  deviceController.getDevice
);

router.get(
  "/:id",
  deviceController.getDeviceById
);

router.put(
  "/:id",
  deviceController.updateDevice
);

router.delete(
  "/:id",
  deviceController.deleteDevice
);

export default router;