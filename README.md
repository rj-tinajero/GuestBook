# GuestBook

Project and concept originates from the book *Express in Action by Even M. Hahn, 2016*. Source code found in chapter 3 *Foundations in Express*.


## Personal changes to source code

I made some modifications to the source code for displaying and storing the entries. Most of the structure and look is still pulled straight from the book.
But one difference I made was setting up a postgres database to store the entries in. This way the entries can be pulled directly from a
"Entry" table instead of new ones having to be generated each time the server restarts. 

CRUD operations that I made are Create and Delete operations 

*app.js*
```
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
```

*queries.entries.js*
```
  addEntry(newEntry, callback) {
      return Entry.create(newEntry)
      .then((entry) => {
         callback(null, entry);
      })
      .catch((err) => {
         console.log(err.toString());
         callback(err);
      })
   },
   deleteEntry(id, callback) {
      return Entry.destroy({
         where: {id}
      })
      .then((entry) => {
         callback(null, entry);
      })
      .catch((err) => {
         callback(err);
      })
   }
```
   
Picture of website looks like this (red x button added to allow for deleting entries):

[site picture](https://photos.google.com/photo/AF1QipNXbl6bR2a-wziZ9347Wc13OV2YIX3e_JtIl7m3)


Picture of entries in table model:

[table image](https://photos.google.com/photo/AF1QipNPH_b5sAzSuju_RMrT8J6pWNIxX7fzgd6K14cf)


