// To run in shell:  nodemon app.js
// Then in the browser go to http://localhost:3000/cool.txt

var express = require("express")
var path = require("path")
var fs = require("fs")
var morgan = require("morgan")

var app = express();
var logger = morgan("short")

// adding function to our app's middleware stack
// this func will be called when request comes to this app
// .use loads a middleware function
// app.use(function(req, res, next) {
//     console.log("Request IP: " + req.ip);
//     console.log("Request date:" + new Date());
//     next();
// });


// The code above was replaced with morgan

app.use(logger);

// app.use(function(req, res, next) {
//     var filePath = path.join(__dirname, "static", req.url);
//     fs.stat(filePath, function(err, fileInfo) {
//         if(err) {
//             next();
//             return;
//         }
//         if(fileInfo.isFile()) {
//             res.sendFile(filePath);
//         }
//         else {
//             next();
//         }
//     });
// });

// The code below replaces file send
// If the file exists at the path, it will send it. If not, it will call next and
// continue on to the next middleware in the stack.
var staticFilePath = path.join(__dirname, "static");
app.use(express.static(staticFilePath));


app.use(function(req, res) {
    res.status(404);
    res.send("File not found!")
    }
);

app.listen(3000, function(){
    console.log("App is listen on port 3000");
});