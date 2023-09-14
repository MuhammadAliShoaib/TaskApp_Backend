const express = require("express");
const router = express.Router();
const { Project, validateProject } = require("../model/project");
const { User } = require("../model/user");
const { default: mongoose } = require("mongoose");


router.get("/", async (req, res) => {
    const result = await Project.find().populate("members",["name","email"])
    res.send(result)
})

router.post("/", async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let project = new Project({
        taskName: req.body.taskName,
        members: req.body.members,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        board: req.body.board,
    })
    await project.save();
    res.send(project)
})

module.exports = router;