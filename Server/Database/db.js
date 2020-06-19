import mongoose from "mongoose";

const databaseConnetion = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

export default databaseConnetion;
