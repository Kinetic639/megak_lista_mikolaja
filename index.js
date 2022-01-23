const express = require('express');
require('express-async-errors');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const { childRouter } = require('./routers/child');
const { giftRouter } = require('./routers/gift');
const { homeRouter } = require('./routers/home');
const { handleError } = require('./utils/errors');
const { handlebarsHelpers } = require('./utils/handlebars-helpers');
require('./utils/db');

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
    helpers: handlebarsHelpers, // dodatkowe funkcjonalności dla handlebarsów
  }),
);

app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

//'globalna obsługa błędów'
app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});
