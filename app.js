const express = require('express');
const top10Controller = require('./controllers/top10Controller');

const app = express();

app.use(express.json());

app.use('/top', top10Controller);

const port= 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})