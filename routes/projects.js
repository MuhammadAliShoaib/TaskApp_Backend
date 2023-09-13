const express = require("express");
const router = express.Router();
const { Project, validateProject } = require("../model/project");
const { User } = require("../model/user");


router.get("/", async (req, res) => {
    const result = await Project.find()
    res.send(result)
})

router.post("/", async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const teamMembers = req.body.members;
    const registeredTeamMembers = await Promise.all(
        teamMembers.map(async (member) => {
            const user = await User.findById(member.userId);
            if (!user) {
                return res.status(400).send("Invalid user")
            } else {
                return {_id:member.userId,name:member.name,email:member.email};
            }
        })
    );

    let project = new Project({
        taskName: req.body.taskName,
        members: registeredTeamMembers,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        board: req.body.board,
    })
    await project.save();
    res.send(project)
})

module.exports = router;