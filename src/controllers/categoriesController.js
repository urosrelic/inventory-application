import { pool } from '../db/db.js';
import queries from '../db/queries.js';

async function getAllCategories(req, res, next) {
  const { search } = req.query;

  try {
    const { rows } = search
      ? await pool.query(queries.SEARCH_CATEGORIES, [`%${search}%`])
      : await pool.query(queries.GET_CATEGORIES);

    console.log(rows.items_count);

    res.render('categories', { categories: rows });
  } catch (err) {
    next(err);
  }
}

async function getCategoryById(req, res, next) {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(queries.GET_CATEGORY_BY_ID, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category: rows[0] });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(422).json({ error: 'Missing fields' });
  }

  try {
    const result = await pool.query(queries.CREATE_CATEGORY, [
      name,
      description,
    ]);
    res.status(200).json({
      category: result.rows[0],
      message: 'Category created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
};
