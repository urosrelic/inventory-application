const { pool } = require('../db/db');

async function getAllCategories(req, res, next) {
  const { search } = req.query;
  console.log(search);

  try {
    const { rows } = search
      ? await pool.query('SELECT * FROM categories WHERE name ILIKE $1', [
          `%${search}%`,
        ])
      : await pool.query('SELECT * FROM categories');

    res.status(200).json({ categories: rows });
  } catch (err) {
    next(err);
  }
}

async function getCategoryById(req, res, next) {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category: rows[0] });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
};
