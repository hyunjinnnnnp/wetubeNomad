import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
}); //데이터가 어디있는지 명시

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log(`error on DB connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
