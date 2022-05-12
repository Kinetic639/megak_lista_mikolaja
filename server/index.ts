import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import { giftRouter } from './routers/gift';
import { childRouter } from './routers/child';

import { handleError } from './utils/errors';
import './utils/db';

const app = express();

app.use(
  cors({
    origin: 'https://santas-gifts.netlify.app',
    // origin: 'https://santas-gifts.herokuapp.com/',
    // origin: 'http://localhost:3000',

  }),
);
app.use(express.json()); // Content-type: application/json

app.use('/children', childRouter);
app.use('/gifts', giftRouter);

app.use(handleError);
const port = Number(process.env.PORT) || 3001;

app.get('/', (req, res) => {
  res.send(`santas gifts app is running ${port}`);
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on http://localhost:${port}`);
});
