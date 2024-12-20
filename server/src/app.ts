import Express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user';
import authRoutes from './routes/auth';
import connectDb from './db/config';

dotenv.config();
connectDb();
const app = Express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/auth', authRoutes);
app.use('', userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    console.error('Headers already sent:', err);
    return next(err);
  }

  console.error('Unhandled error:', err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
});
app.listen(port, () => {
  console.log(`Server start http://localhost:${port}`);
});
