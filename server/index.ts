import 'dotenv/config'
import * as express from "express";
import * as cors from 'cors';
import 'express-async-errors';
import {giftRouter} from "./routers/gift";
import {childRouter} from "./routers/child";
import {handleError} from "./utils/errors";
import './utils/db';

const app = express();

app.use(cors({
    origin: 'https://santas-gifts.netlify.app/gifts',
}));
app.use(express.json()); // Content-type: application/json

app.use('/children', childRouter);
app.use('/gifts', giftRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
