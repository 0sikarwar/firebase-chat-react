"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLastMsg = fetchLastMsg;
exports.fetchMsgs = fetchMsgs;
exports.fetchStatus = fetchStatus;
exports.getUsers = getUsers;
exports.loginUser = loginUser;
exports.markReadLastMsg = markReadLastMsg;
exports.registerUser = registerUser;
exports.saveMsg = saveMsg;
exports.signoutUser = signoutUser;
exports.syncStatus = syncStatus;

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _initializeFirebaseApp = require("./initializeFirebaseApp");

var _database = require("firebase/database");

var _excluded = ["email", "password"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var currentUserId = function currentUserId() {
  var _getAuthObj$currentUs;

  return (_getAuthObj$currentUs = (0, _initializeFirebaseApp.getAuthObj)().currentUser) === null || _getAuthObj$currentUs === void 0 ? void 0 : _getAuthObj$currentUs.uid;
};

var getUserDocRef = function getUserDocRef(id) {
  return (0, _firestore.doc)((0, _initializeFirebaseApp.getStoreObj)(), "users", id);
};

function syncStatus() {
  (0, _auth.onAuthStateChanged)((0, _initializeFirebaseApp.getAuthObj)(), function (user) {
    if (user) {
      var uid = user.uid;
      updateStatus(uid);
    }
  });

  var updateStatus = function updateStatus(uid) {
    var userStatusDatabaseRef = (0, _database.ref)((0, _initializeFirebaseApp.getDbObj)(), "/status/" + uid);
    var isOfflineForDatabase = {
      state: "offline",
      last_changed: (0, _database.serverTimestamp)()
    };
    var isOnlineForDatabase = {
      state: "online",
      last_changed: (0, _database.serverTimestamp)()
    };
    var connectedRef = (0, _database.ref)((0, _initializeFirebaseApp.getDbObj)(), ".info/connected");
    (0, _database.onValue)(connectedRef, function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(snapshot) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(snapshot.val() === false)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                (0, _database.onDisconnect)(userStatusDatabaseRef).set(isOfflineForDatabase).then(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          (0, _database.set)(userStatusDatabaseRef, isOnlineForDatabase);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  };
}

function getUsers(setUsers) {
  var userCollectionRef = (0, _firestore.collection)((0, _initializeFirebaseApp.getStoreObj)(), "users");
  var q = (0, _firestore.query)(userCollectionRef, (0, _firestore.where)("uid", "!=", currentUserId()));
  return (0, _firestore.onSnapshot)(q, function (querySnapshot) {
    var list = [];
    querySnapshot.forEach(function (doc) {
      list.push(doc.data());
    });
    setUsers(list);
  });
}

function registerUser(_x2) {
  return _registerUser.apply(this, arguments);
}

function _registerUser() {
  _registerUser = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(data) {
    var email, password, rest, errorInReg, userObj, res, resp;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = data.email, password = data.password, rest = _objectWithoutProperties(data, _excluded);
            if (!email || !password) console.error("Email & Password required to register a Firebase user");
            errorInReg = false;
            userObj = null;
            _context3.prev = 4;
            _context3.next = 7;
            return (0, _auth.fetchSignInMethodsForEmail)((0, _initializeFirebaseApp.getAuthObj)(), email);

          case 7:
            res = _context3.sent;

            if (!res.length) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", null);

          case 10:
            _context3.next = 12;
            return (0, _auth.createUserWithEmailAndPassword)((0, _initializeFirebaseApp.getAuthObj)(), email, password);

          case 12:
            resp = _context3.sent;
            userObj = _objectSpread(_objectSpread({
              uid: resp.user.uid,
              email: email
            }, rest), {}, {
              createdAt: _firestore.Timestamp.fromDate(new Date()),
              isOnline: true
            });
            _context3.next = 16;
            return (0, _firestore.setDoc)(getUserDocRef(resp.user.uid), _objectSpread({}, userObj));

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](4);
            console.error("registerUser Firebase", _context3.t0);
            errorInReg = true;

          case 22:
            if (errorInReg) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", userObj);

          case 24:
            return _context3.abrupt("return", null);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 18]]);
  }));
  return _registerUser.apply(this, arguments);
}

function loginUser(_x3, _x4) {
  return _loginUser.apply(this, arguments);
}

function _loginUser() {
  _loginUser = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(email, password) {
    var resp, userDocRef, docSnap;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!email || !password) console.error("Email & Password required to Login a Firebase user");

            if (!(0, _initializeFirebaseApp.getAuthObj)().currentUser) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", (0, _initializeFirebaseApp.getAuthObj)().currentUser);

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return (0, _auth.signInWithEmailAndPassword)((0, _initializeFirebaseApp.getAuthObj)(), email, password);

          case 6:
            resp = _context4.sent;
            userDocRef = getUserDocRef(resp.user.uid);
            _context4.next = 10;
            return (0, _firestore.updateDoc)(userDocRef, {
              isOnline: true
            });

          case 10:
            _context4.next = 12;
            return (0, _firestore.getDoc)(userDocRef);

          case 12:
            docSnap = _context4.sent;

            if (!docSnap.exists()) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", docSnap.data());

          case 15:
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](3);
            console.error("loginUser Firebase", _context4.t0);

          case 20:
            return _context4.abrupt("return", null);

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 17]]);
  }));
  return _loginUser.apply(this, arguments);
}

function signoutUser() {
  return _signoutUser.apply(this, arguments);
}

function _signoutUser() {
  _signoutUser = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _firestore.updateDoc)(getUserDocRef(currentUserId()), {
              isOnline: false
            });

          case 3:
            _context5.next = 5;
            return (0, _auth.signOut)((0, _initializeFirebaseApp.getAuthObj)());

          case 5:
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.error("signoutUser Firebase", _context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return _signoutUser.apply(this, arguments);
}

var getMsgId = function getMsgId(id2) {
  var id1 = currentUserId();
  return id1 > id2 ? "".concat(id1, "-").concat(id2) : "".concat(id2, "-").concat(id1);
};

var getMsgRef = function getMsgRef(id2) {
  return (0, _firestore.collection)((0, _initializeFirebaseApp.getStoreObj)(), "messages", getMsgId(id2), "chat");
};

function saveMsg(_x5, _x6) {
  return _saveMsg.apply(this, arguments);
}

function _saveMsg() {
  _saveMsg = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(text, selectedUid) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _firestore.addDoc)(getMsgRef(selectedUid), {
              text: text,
              from: currentUserId(),
              to: selectedUid,
              createdAt: _firestore.Timestamp.fromDate(new Date())
            });

          case 2:
            _context6.next = 4;
            return (0, _firestore.setDoc)((0, _firestore.doc)((0, _initializeFirebaseApp.getStoreObj)(), "lastMsg", getMsgId(selectedUid)), {
              text: text,
              from: currentUserId(),
              to: selectedUid,
              createdAt: _firestore.Timestamp.fromDate(new Date()),
              unread: true
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _saveMsg.apply(this, arguments);
}

function fetchMsgs(selectedUid, setMsgs) {
  var q = (0, _firestore.query)(getMsgRef(selectedUid), (0, _firestore.orderBy)("createdAt", "asc"));
  return (0, _firestore.onSnapshot)(q, function (snapshot) {
    var msgs = [];
    snapshot.forEach(function (doc) {
      msgs.push(doc.data());
    });
    setMsgs(msgs);
  });
}

function fetchLastMsg(selectedUid, setLastMsg) {
  var lastMsgRef = (0, _firestore.doc)((0, _initializeFirebaseApp.getStoreObj)(), "lastMsg", getMsgId(selectedUid));
  return (0, _firestore.onSnapshot)(lastMsgRef, function (snapshot) {
    setLastMsg(snapshot.data());
  });
}

function markReadLastMsg(_x7) {
  return _markReadLastMsg.apply(this, arguments);
}

function _markReadLastMsg() {
  _markReadLastMsg = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(selectedUid) {
    var msgId, docSnap;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            msgId = getMsgId(selectedUid);
            _context7.next = 3;
            return (0, _firestore.getDoc)((0, _firestore.doc)((0, _initializeFirebaseApp.getStoreObj)(), "lastMsg", msgId));

          case 3:
            docSnap = _context7.sent;

            if (!(docSnap.data() && docSnap.data().from !== currentUserId())) {
              _context7.next = 7;
              break;
            }

            _context7.next = 7;
            return (0, _firestore.updateDoc)((0, _firestore.doc)((0, _initializeFirebaseApp.getStoreObj)(), "lastMsg", msgId), {
              unread: false
            });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _markReadLastMsg.apply(this, arguments);
}

function fetchStatus(selectedUser, setStatus) {
  var userStatusDbRef = (0, _database.ref)((0, _initializeFirebaseApp.getDbObj)());
  (0, _database.get)((0, _database.child)(userStatusDbRef, "/status/" + selectedUser.uid)).then(function (snapshot) {
    if (snapshot.exists()) {
      var data = snapshot.val();
      setStatus(!selectedUser.isOnline || data.state === "offline" ? "offline" : "online");
    } else {
      console.log("No data available");
    }
  });
}