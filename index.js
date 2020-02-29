const express = require("express");
const bodyParser = require('body-parser')
const moviesRouter = require("./movies/router");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(moviesRouter);

app.listen(port, () => console.log(`App started in port: ${port}`));