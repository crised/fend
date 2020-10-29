var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();


const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

console.log(`Your API key is ${process.env.API_KEY}`);

const meaningGet = function (text = 'Feeling good!') {
    text = escape(text);
    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=jsonc&txt=${text}&lang=en`
    fetch(url)
        .then(res => res.json())
        .then(json => console.log(json.agreement));

}

// meaningGet("Main dishes were quite good, but desserts were too sweet for me.")
meaningGet("Great president");

// fetch('https://api.github.com/users/github')
//     .then(res => res.json())
//     .then(json => console.log(json));
//
// fetch('https://httpbin.org/post', { method: 'POST', body: 'a=1' })
//     .then(res => res.json()) // expecting a json response
//     .then(json => console.log(json));