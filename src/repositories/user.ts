import mongoose from "../db/mongodb/index";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
