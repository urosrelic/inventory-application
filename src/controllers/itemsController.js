import { pool } from '../db/db.js';
import queries from '../db/queries.js';

async function getAllItems(req, res, next) {
  try {
    const { rows } = await pool.query(queries.GET_ITEMS);
    console.log(rows);
    res.render('items', { items: rows });
  } catch (err) {
    next(err);
  }
}

async function createItem(req, res, next) {
  const { price, name, description, categoryId } = req.body;

  if (!name || !price || !description || !categoryId) {
    res.status(422).json({ error: 'Missing fields' });
  }
  try {
    const result = await pool.query(queries.CREATE_ITEM, [
      name,
      description,
      price,
      categoryId,
    ]);

    res.status(200).json({
      item: result.rows[0],
      message: 'Item created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export default {
  getAllItems,
  createItem,
};
