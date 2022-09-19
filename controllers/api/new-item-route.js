// POST Route for updating the 'claimed' status of an item

const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const router = express.Router();
const filepath = path.join(__dirname, '../db/db.json');


// Get request //

router.get("api/withAuthApit", (req, res) => {
    fs.sendFile(path.join(__dirname, '../db/db.json'));
});

//Post Request 

router.post("api/withAuthApi", (req, res) => {
    let event = (req.body);
    fs.readFile(filepath, function (err, data) {
        let json = JSON.parse(data)
        json.push(event);
        let newData = JSON.stringify(json);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), newData)
        res.sendFile(path.join(__dirname, '../db/db.json'))
    })
})


// Delete Request
router.delete("/api/withAuthApi/:id", (req, res) => {
    newArr = []
    console.log(req.params.id);
    let id = req.params.id;
    fs.readFile(filepath, function (err, data) {
        let json = JSON.parse(data)
        console.log(json);
        newArr = JSON.stringify(newArr);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'),newArr);
        res.sendFile(path.join(__dirname, '../db/db.son'))
    })

})