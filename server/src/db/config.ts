import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@food-diary.xroqh.mongodb.net/?retryWrites=true&w=majority&appName=food-diary`;

const connectDb = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log('Connected with MongoDB!');
    })
    .catch((err: any) => {
      console.error('Connection failed!', err);
    });
};
export default connectDb;
