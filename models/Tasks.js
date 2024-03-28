import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tasks: [
        {
            id: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: String,
            checked: {
                type: Boolean,
                default: false,
            }
        }
    ],
    date: {
        type: String,
        required: true,
    },
    deadline: String,
    overdue: Boolean,

}, {
    timestamps: true
})

export default mongoose.model('Tasks', TasksSchema)