import dotenv from 'dotenv';
import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env['USER_NAME']}:${process.env['PASSWORD']}@food-diary.xroqh.mongodb.net/?retryWrites=true&w=majority&appName=food-diary`;
dotenv.config();

const connectDb = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log('Connected with MongoDB!');
    })
    .catch((err: any) => {
      console.error('Connection failed!', err);
    });
};
export default connectDb;
