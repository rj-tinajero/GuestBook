var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
const entryQueries = require("./src/db/queries.entries");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res, next) {
    entryQueries.getAllEntries((err, entries) => {
        if(err) {
            console.log(err);
            res.redirect(500, "/")
        }
        res.render("index", {entries});
    })
});
app.get("/new-entry", function(req, res, next) {
    res.render("new-entry");
});

app.post("/new-entry", function(req, res, post) {
    if(!req.body.name || !req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a name, title, and a body");
        return;
    }
    let newEntry = {
        name: req.body.name,
        title: req.body.title,
        content: req.body.body,
        published: new Date().toString()
    };
    entryQueries.addEntry(newEntry, (err, entry) => {
        if(err) {
            res.redirect(500, "/new-entry");
        }
        res.redirect("/");
    })
    
});
app.post("/destroy/:id", function(req, res, post) {
    entryQueries.deleteEntry(req.params.id, (err, entry) => {
        if(err) {
            console.log(err, "ERR in DELETE");
        }
        res.redirect(303, "/");
    })
})

app.use(function(req, res) {
    res.status(404).render("404");
});

http.createServer(app).listen(3000, function() {
    console.log("Guestbook app started on port 3000.");
});