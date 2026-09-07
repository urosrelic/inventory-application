const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);

module.exports = router;
