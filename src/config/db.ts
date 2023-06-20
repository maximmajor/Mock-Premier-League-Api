import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as CustomConnectOptions);
    console.log('Connected to database');
  } catch (error: any) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};