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
`;

const CREATE_CATEGORY = sql`
  INSERT INTO categories (name, description)
  VALUES ($1, $2)
  RETURNING *
`;

// ITEMS
const GET_ITEMS = sql`
    SELECT * FROM items
`;

const GET_ITEMS_BY_CATEGORY = sql`
    select * from items
    where category_id = $1
`;

const CREATE_ITEM = sql`
  INSERT INTO items (name, description, price, category_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *
`;

export default {
  // Categories
  GET_CATEGORIES,
  SEARCH_CATEGORIES,
  GET_CATEGORY_BY_ID,
  CREATE_CATEGORY,
  // Items
  GET_ITEMS,
  CREATE_ITEM,
  GET_ITEMS_BY_CATEGORY,
};
