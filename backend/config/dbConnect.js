import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_PASS = process.env.MONGODB_ATLAS_PASS;
const DB_USER = process.env.MONGODB_ATLAS_USERNAME;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.4ksz93v.mongodb.net/?retryWrites=true&w=majority`;

export const connectDB = async () => {
   try {
    await mongoose.connect(DB_URI);
    console.log(`Database Connected Successfully`);
   } catch (error) {
    console.log(`Database Error ${error.message}`);
   }
};
 