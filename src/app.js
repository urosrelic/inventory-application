const express = require('express');
const { urlencoded } = require('express');
const path = require('node:path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK!' });
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
