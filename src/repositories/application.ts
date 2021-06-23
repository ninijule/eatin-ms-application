import mongoose from "../db/mongodb/index";

const Schema = mongoose.Schema;
const ApplicationSchema = new Schema({
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
