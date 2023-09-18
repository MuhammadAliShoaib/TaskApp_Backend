const mongoose = require("mongoose")
const Joi = require("joi")
const JoiObjectId = require("joi-objectid")(Joi);
const { User } = require("../model/user")




const projectSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
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
    subTasks: [{
        type: new mongoose.Schema({
            subTaskName: {
                type: String,
                required: true
            },
            subTaskStatus: {
                type: String,
                default: "Incomplete",
                enum: ["Complete", "Incomplete"]
            }
        })
    }
    ],
    board: {
        type: String,
        enum: ["Urgent", "Running", "Ongoing"],
        default: "Running"
    },
    projectStatus: {
        type: String,
        required:true,
        enum: ["Complete", "In Progress", "To Do"]
    }
})

const Project = mongoose.model("project", projectSchema);

const validateProject = (project) => {
    const schema = Joi.object({
        userID: JoiObjectId().required(),
        taskName: Joi.string().min(5).max(25).required(),
        members: Joi.array().items(
            Joi.object({
                _id: JoiObjectId().required(),
            })
        ).min(1),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        subTasks: Joi.array().items(
            Joi.object({
                subTaskName: Joi.string().required(),
                subTaskStatus: Joi.string().required(),
            })
        ).min(1),
        board: Joi.string().required(),
        projectStatus: Joi.string().required(),
    })

    return schema.validate(project)
}

exports.Project = Project;
exports.validateProject = validateProject;