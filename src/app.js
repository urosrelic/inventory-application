const express = require('express');
const { urlencoded } = require('express');

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
