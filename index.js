const express = require('express');
const mongoose = require('mongoose')
const user = require("./routes/users");
const login = require("./routes/login");
const project = require("./routes/projects")
const app = express();
app.use(express.json());
require('dotenv').config();



app.use("/api/users", user);
app.use("/api/login", login);
app.use("/api/projects", project);

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('Connected to MongoDB...')
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch(err => console.error('Could not connect to MongoDB...' + err));



