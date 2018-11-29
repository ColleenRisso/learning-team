const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/unicorns', require('./unicornApi'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});

const PORT = 5000;

// app.listen(PORT, () => {
//   console.log("listening on port ", PORT);
// });

module.exports = app;
