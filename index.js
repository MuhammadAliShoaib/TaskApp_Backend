const express = require('express');
const mongoose = require('mongoose')
const user = require("./routes/users");
const login = require("./routes/login");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
require('dotenv').config();



app.use("/api/users", user);
app.use("/api/login", login);

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('Connected to MongoDB...')
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch(err => console.error('Could not connect to MongoDB...'));



