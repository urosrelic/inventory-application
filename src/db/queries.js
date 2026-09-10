
import { sql } from './sql.js';

// CATEGORIES
const GET_CATEGORIES = sql`
  SELECT categories.id,
         categories.name,
         categories.description,
         count(items.id) AS items_count
  FROM categories
         LEFT JOIN items ON items.category_id = categories.id
  GROUP BY categories.id, categories.name, categories.description
`;

const SEARCH_CATEGORIES = sql`
  SELECT categories.id,
         categories.name,
         categories.description,
         count(items.id) AS items_count
  FROM categories
         LEFT JOIN items ON items.category_id = categories.id
  WHERE categories.name ILIKE $1
  GROUP BY categories.id, categories.name, categories.description
`;

const GET_CATEGORY_BY_ID = sql`
  SELECT * FROM categories WHERE id = $1
`

const CREATE_CATEGORY = sql`
  INSERT INTO categories (name, description)
  VALUES ($1, $2)
  RETURNING *
`;

// ITEMS
const GET_ITEMS = sql`
    SELECT * FROM items
`

export default {
  GET_CATEGORIES,
  SEARCH_CATEGORIES,
  GET_CATEGORY_BY_ID,
  CREATE_CATEGORY,
  GET_ITEMS,
};

