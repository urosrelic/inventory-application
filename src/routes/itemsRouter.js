import { Router } from 'express';
import itemsController from '../controllers/itemsController.js';

const router = Router();

router.get('/', itemsController.getAllItems);
router.post('/', itemsController.createItem)

export default router;
