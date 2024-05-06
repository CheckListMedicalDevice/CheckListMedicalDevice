import { Router } from "express";
import device_transection from"../controllers/device_transection.controller"


const router = Router();

router.get(
    '/',
    device_transection.getBillsDevice
);

router.get(
    '/getbillsDevice', device_transection.getBillsDevice
)




router.get(
    '/generatetransections', device_transection.generateDeviceTransections
)

router.get('/getbillbyadmin', device_transection.getDeviceBillsByAdmin)

router.put('/:id', device_transection.updateDeviceTransection)



export default router;
