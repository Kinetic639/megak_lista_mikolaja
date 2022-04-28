import * as express from"express";
import 'express-async-errors';
import * as methodOverride  from "method-override";
import {engine} from "express-handlebars";
import {handleError} from "./utils/errors";
import {homeRouter} from "./routers/home";
import {childRouter} from "./routers/child";
import {giftRouter} from "./routers/gift";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import'./utils/db';

const PORT = process.env.PORT || 3002



const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers, // Dodatkowe funkcjonalności, które chcemy dodać do Handlebarsów
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);

if (typeof PORT === "number") {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Program działa na adresie http://localhost:3002');
    })
}
