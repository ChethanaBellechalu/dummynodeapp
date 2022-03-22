// Requiring in-built https for creating
// https server
const http = require("http");

// Express for handling GET and POST request
const express = require("express");
const app = express();

// Requiring file system to use local files
const fs = require("fs");

// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");

// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get request for root of the app
app.get("/", function (req, res) {

// Sending index.html to the browser
res.render('index.html')
});

app.post('/nlp', (req, res) => {
    console.info('printing request', req.body)
    const response = {
        "answer": "{\"answer\":\"Welcome to conversational AI\",\"instructions\":{}}",
        "matchedContext": "",
        "conversationPayload": "{}"
    }
    res.json(response)
})

// Creating object of key and certificate
// for SSL


// Creating https server by passing
// options and app object
const PORT = process.env.PORT || 3000
http.createServer(app)
.listen(PORT, function (req, res) {
console.log("Server started at port 3000");
});
