import mongoose from "../db/mongodb/index";

const Schema = mongoose.Schema;
const ApplicationSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 255
    },
    token: {
        type: String,
        required: true,
        minlength: 0,
    }

});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
