const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const { handleError } = require('./utils/errors');

const app = express();

app.use(methodOverride('_method'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));
app.use(express.json()); // content-type: application/json
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers, // dodatkowe funkcjonalności dla handlebarsów
  }),
);

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('children/list');
});

//'globalna obsługa błędów'
app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});
