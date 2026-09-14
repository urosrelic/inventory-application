import { Router } from 'express';
import categoriesController from '../controllers/categoriesController.js';
const router = Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.get('/:id/items', categoriesController.getCategoryItems)

router.post('/', categoriesController.createCategory);

export default router;
