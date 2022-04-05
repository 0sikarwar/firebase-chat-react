"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _app = require("./app");

var _DefaultAvatar = _interopRequireDefault(require("./DefaultAvatar"));

var _firebaseHelper = require("./firebaseHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ChatHeader = function ChatHeader() {
  var _useContext = (0, _react.useContext)(_app.ChatContext),
      selectedUser = _useContext.selectedUser,
      setIsChatOpen = _useContext.setIsChatOpen;

  var _useState = (0, _react.useState)("offline"),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  function init() {
    return _init.apply(this, arguments);
  }

  function _init() {
    _init = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _firebaseHelper.fetchStatus)(selectedUser, setStatus);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _init.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    selectedUser && init();
  }, [selectedUser]);
  return _react.default.createElement("div", {
    class: "chat-head row align-center"
  }, _react.default.createElement("div", {
    class: "chat-head-info row align-center"
  }, selectedUser ? _react.default.createElement(_react.default.Fragment, null, selectedUser.avatar ? _react.default.createElement("img", {
    src: selectedUser.avatar,
    alt: "Avatar",
    class: "profile-img"
  }) : _react.default.createElement(_DefaultAvatar.default, null), _react.default.createElement("div", null, _react.default.createElement("p", {
    class: "message-username"
  }, selectedUser.name), status === "online" ? _react.default.createElement("p", {
    class: "online"
  }, _react.default.createElement("span", {
    class: "glow-green"
  }), "Online") : _react.default.createElement("p", {
    class: "offline"
  }, _react.default.createElement("span", {
    class: "glow-red"
  }), "Offline"))) : _react.default.createElement("h2", null, "Logo")), _react.default.createElement("div", {
    onClick: function onClick() {
      return setIsChatOpen(false);
    }
  }, _react.default.createElement(Close, null)));
};

var Close = function Close() {
  return _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "chat-close",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "#fff",
    strokeWidth: 2
  }, _react.default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18L18 6M6 6l12 12"
  }));
};

var _default = ChatHeader;
exports.default = _default;