import { Router } from "express";

import deviceController from "../controllers/device_section.controller";

const router = Router();

router.post("/createDeviceSection/:id", deviceController.createDeviceSection);

router.get("/getDeviceSection", deviceController.getDeviceSection);

router.get("/getDeviceById", deviceController.getDeviceSectionById);



router.get(
  "/list/:deviceId",
  deviceController.getDeviceSection
);

router.get(
  "/:id",
  deviceController.getDeviceSectionById
);

router.put(
  "/:id",
  deviceController.updateDeviceSection
);

router.delete(
  "/:id",
  deviceController.deleteDeviceSection
);

export default router;