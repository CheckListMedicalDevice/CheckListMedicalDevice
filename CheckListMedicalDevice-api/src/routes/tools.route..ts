import { Router } from "express";
import toolsController from "../controllers/tools.controller";



const router = Router();
router.get("/gettools",  toolsController.getTools);
// router.get('/self', toolsController.self);

// router.put('/self', toolsController.updateToolsSelf)

router.post('/createTools',toolsController.createTools);

router.get(
    '/',
    toolsController.getTools
);

router.get(
    '/:id',
    toolsController.getToolsById
);

router.put(
    '/:id',
    toolsController.updateTools
);

router.delete(
    "/:id", 

    toolsController.deleteTools
    );

export default router;