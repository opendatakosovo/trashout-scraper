const rp = require("request-promise");
const API_KEY = ""; // You have to insert your key given from trashout
const API_URL = "https://api.trashout.ngo/v1/trash/";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "trashout_db";

MongoClient.connect(
  url,
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to db");

    db = client.db(dbName);
  }
);

(function reqLoop(i) {
  setTimeout(function() {
    rp({
      url: API_URL + i,
      headers: {
        "x-api-key": API_KEY
      },
      json: true
    }).then(function(obj) {
      if (obj.gps.area.country === "Kosovo") {
        db.collection(dbName).insert(obj);
        console.log(
          `Inserted a doc with id ${obj.id} from ${obj.gps.area.country}`
        );
      }
    });
    if (i > 11) {
      --i;
      reqLoop(i);
    }
  }, 300);
})(42300);
