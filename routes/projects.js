const express = require("express");
const router = express.Router();
const { Project, validateProject } = require("../model/project");
const { User } = require("../model/user");


router.get("/", async (req, res) => {
    const result = await Project.find().populate("members", ["name", "email"])
    res.send(result)
})

router.post("/", async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let project = new Project({
        userID: req.body.userID,
        taskName: req.body.taskName,
        members: req.body.members,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        subTasks: req.body.subTasks,
        board: req.body.board,
        projectStatus: req.body.projectStatus,
    })
    await project.save();
    res.send(project)
})

module.exports = router;