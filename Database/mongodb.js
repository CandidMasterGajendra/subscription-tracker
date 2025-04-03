import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

console.log(DB_URI);
if(!DB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

// add connection to mongodb using async function 
const connectToDatabase = async () => {
    try {
      await mongoose.connect(DB_URI);
      console.log(`Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
      console.error('Error connecting to database: ', error);
  
      process.exit(1);
    }
  }
  
  export default connectToDatabase;