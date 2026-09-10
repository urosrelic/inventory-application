import { pool } from '../db/db.js';
import queries from '../db/queries.js';

async function getAllItems(req, res, next) {
  try {
    const { rows } = await pool.query(queries.GET_ITEMS);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllItems,
};
