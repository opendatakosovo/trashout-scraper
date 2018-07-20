const rp = require("request-promise");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const API_KEY = ""; // You have to insert your key given from trashout
const API_URL =
  "http://api.trashout.ngo/v1/trash/?geoAreaCountry=Kosovo&attributesNeeded=id,gpsShort,gpsFull,types,size,note,userInfo,anonymous,status,cleanedByMe,images,updateTime,updateHistory,url,created,accessibility,updateNeeded,unreviewed,spam";
const URL = "mongodb://localhost:27017";
const DB_NAME = "secondway_trashout_api_db";

MongoClient.connect(
  URL,
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to db");

    db = client.db(DB_NAME);
  }
);

rp({
  url: API_URL,
  headers: {
    "x-api-key": API_KEY
  },
  json: true
}).then(function(res) {
  db.collection(DB_NAME).insertMany(res);
  console.log("Inserted to db");
});
