const mongoose = require("mongoose")
const Joi = require("joi")
const JoiObjectId = require("joi-objectid")(Joi);
const {User}  = require("../model/user")


const projectSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 25
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    board: {
        type: String,
        enum: ["Urgent", "Running", "Ongoing"],
        default: "Running"
    }
})

const Project = mongoose.model("project", projectSchema);

const validateProject = (project) => {
    const schema = Joi.object({
        taskName: Joi.string().min(5).max(25).required(),
        members: Joi.array().items(
            Joi.object({
                _id: JoiObjectId().required(),
            })
        ).min(1),
        date: Joi.date().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        board: Joi.string().required()
    })

    return schema.validate(project)
}

exports.Project = Project;
exports.validateProject = validateProject;