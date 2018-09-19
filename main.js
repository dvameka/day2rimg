// Step 1. Load Path and Express
const path = require("path");
const express = require("express");
const fs = require("fs");
const hbs = require("express-handlebars");
// const resources = ['iamges, 'public'];

// Step 2. Create an Instance of Express Application
const app = express();

/*    
    app.use((req, res, next) => {
    console.log(`>>> ${new Date()} ${req.method}`);
    next();
});
*/ 

// Config. express to use handlebafrs as the rendering engine
app.engine('hbs', hbs());
app.set('view engine','hbs');

// Step 3. Define Route (middleware)
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/images")));


// GET HTTP
app.get("/over", (req, resp)=>{
    // define variables for randomizer
    var fList = [];

    const testFolder = './images/';

    //function to read files / push files to html
    fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
    fList.push(file);  // push filename of images to flist[] array
    })

    var randomImg = fList[Math.floor(Math.random() * fList.length)];
        
    resp.status(200);
    resp.type('text/html');
    resp.send(`<img width="500px" src="${randomImg}">`);

});

app.get("/random-image", (req, resp)=>{

    var fList = [];

    const testFolder = './images/';

    //function to read files / push files to html
    fs.readdirSync(testFolder).forEach(file => {
    console.log(file);
    fList.push(file);  // push filename of images to flist[] array
    })

    var randomImg = fList[Math.floor(Math.random() * fList.length)];
        
    resp.status(200);
    resp.type('text/html');
    resp.type('gif');
    resp.type('png');
    resp.sendFile(path.join(__dirname, 'images', randomImg));   
});

app.get("/time", (req, resp) => {
    resp.status(200);
    resp.format({
        'text/html':() => {
            resp.render ('time', { time: 
                (new Date(). toString()), layout: false
            })
        },
        'application/json': () => {
            resp.json({time: new Date()
            });
        },  
        'default':() => {
            resp.status(406);
            resp.send("Not Acceptable");
        }
    });  
});

// Catch All 
app.use((req, resp) => {
    resp.status(404);
    resp.sendFile(path.join(__dirname, 'public', 'error.html'));
});

const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

//Step 4. Start the WebServer
app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
    });
