const express = require('express');
const { urlencoded } = require('express');
const path = require('node:path');
const { pool } = require('./db/db');
const categoriesRouter = require('./routes/categoriesRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.use('/categories', categoriesRouter);

app.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM categories');
  res.status(200).json({ message: 'OK!', rows });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
