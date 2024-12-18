import Express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { pool } from './config';
import userRouter from './routes/user';
import authRoutes from './routes/auth';
import connectDb from './db/config';

dotenv.config();
connectDb();
const app = Express();
const port = 3000;
pool.connect();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Express and Typescirpt');
});

app.use('', userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
