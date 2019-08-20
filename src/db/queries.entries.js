const Entry = require("./models").Entry;

module.exports = {
   getAllEntries(callback) {
      return Entry.findAll()
      .then((entries) => {
         callback(null, entries);
      })
      .catch((err) => {
         callback(err);
      })
   },
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


}