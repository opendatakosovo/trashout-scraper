const rp = require("request-promise");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const API_KEY = ""; // You have to insert your key given from trashout
const API_URL = "https://api.trashout.ngo/v1/trash/";
const URL = "mongodb://localhost:27017";
const DB_NAME = "firstway_trashout_api_db";

MongoClient.connect(
  URL,
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to db");

    db = client.db(DB_NAME);
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
    })
      .then(function(res) {
        let c = res.gps.area.country;
        if (c === "Kosovo") {
          db.collection(DB_NAME).insert(res);
          console.log(`Inserted a doc with id ${res.id} from ${c}`);
        } else if (
          c === null ||
          c === "Unknown" ||
          c === "unknown" ||
          c === "undefined"
        ) {
          console.log(`Doc with id: ${c} is not valid`);
        } else if (res.error) {
          console.log(`Trashout point does not exist`);
        } else {
          console.log(`Read a doc with id ${res.id} from ${c}`);
        }
      })
      .catch(function(err) {});
    if (i > 11) {
      --i;
      reqLoop(i);
    }
  }, 300);
})(42000);
