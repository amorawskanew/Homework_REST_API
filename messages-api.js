const express = require("express");
const bodyParser = require('body-parser')
var msgCounter = 0;
const app = express();
const port = process.env.PORT || 3000;

const msgcountMiddleware = (req, res, next) => {
  if (msgCounter === 5) {
    console.log("429 Too Many Requests");
    res.status(429).end()
  } else {
    msgCounter++;
    console.log("Message no.: " + msgCounter);
    next()
}}

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/messages', msgcountMiddleware, (req, res) => {
  if(!req.body.text) {
    console.log("400 Bad Request");
    res.status(400).end()
  } else {
    const messageText=req.body.text;
    console.log("Text: " + messageText);
    res.json({message: messageText});
  }
});

app.listen(port, () => console.log(`App started in port: ${port}`));