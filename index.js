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
let counter = 0

// Get request for root of the app
app.get("/", function (req, res) {

// Sending index.html to the browser
res.render('index.html')
});

app.post('/nlp', (req, res) => {
    
    const response = {
        "answer": "{\"answer\":\"Welcome to conversational AI\",\"instructions\":{}}",
        "matchedContext": "",
        "conversationPayload": "{}"
    }
    res.json(response)
})

app.post('/tts', (req, res) => {
    const isValid = validateRequestBody(req.body)
    if (isValid) {
		counter++ 
		let response
		console.info('printing request body', req.body.text)
		if(counter === 1) {
			response = fs.readFileSync('welcome.wav')
		} else if(counter === 2){
			response = fs.readFileSync('howareyou.wav')
		} else if (counter === 3) {
			response = fs.readFileSync('whatday.wav')
			counter = 0
		}
        // const response = fs.readFileSync('audio13.wav')
    res.setHeader('content-type', 'application/octet-stream')
    res.send(response)
    }
    res.status(500).send({})
    
})

const validateRequestBody = (requestBody) => {
    if (requestBody.apiKey === 'top-secret') {
        return true
    }
    return false
}

// Creating object of key and certificate
// for SSL


// Creating https server by passing
// options and app object
const PORT = process.env.PORT || 3000
http.createServer(app)
.listen(PORT, function (req, res) {
console.log("Server started at port 3000");
});
