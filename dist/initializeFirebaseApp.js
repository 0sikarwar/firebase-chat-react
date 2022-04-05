"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initializeFirebaseApp;
exports.getStoreObj = exports.getDbObj = exports.getAuthObj = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _database = require("firebase/database");

var _firebaseHelper = require("./firebaseHelper");

var auth, store, database;

function initializeFirebaseApp(config) {
  var app = (0, _app.initializeApp)(config);
  auth = (0, _auth.getAuth)(app);
  store = (0, _firestore.getFirestore)(app);
  database = (0, _database.getDatabase)(app);
  (0, _firebaseHelper.syncStatus)();
  return app;
}

var getAuthObj = function getAuthObj() {
  return auth;
};

exports.getAuthObj = getAuthObj;

var getStoreObj = function getStoreObj() {
  return store;
};

exports.getStoreObj = getStoreObj;

var getDbObj = function getDbObj() {
  return database;
};

exports.getDbObj = getDbObj;