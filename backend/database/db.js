import mongoose from "mongoose";

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test");
// }
const dbURI =
  "mongodb+srv://atsin639mongodb:Atul%40Mongodb%406396@cluster0.ryftytc.mongodb.net/taskify-app-db";

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection to MongoDB failed", err));

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Date = mongoose.Date;

const User = new Schema({
  name: String,
  email: String,
  password: String,
});

const Task = new Schema({
  id: ObjectId,
  title: String,
  description: String,
  done: Boolean,
  dueDate: Date,
  userId: ObjectId,
});

export const UserModel = mongoose.model("users", User);
// export const TasksModel = mongoose.model("todos", Task);
