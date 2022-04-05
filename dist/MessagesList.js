"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _app = require("./app");

var _firebaseHelper = require("./firebaseHelper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MessagesList = function MessagesList() {
  var _useContext = (0, _react.useContext)(_app.ChatContext),
      selectedUser = _useContext.selectedUser;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      msgText = _useState2[0],
      setMsgText = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      msgList = _useState4[0],
      setMsgList = _useState4[1];

  var msgEndRef = (0, _react.useRef)();
  var selectedUid = selectedUser.uid;

  function hendleSendMsg() {
    (0, _firebaseHelper.saveMsg)(msgText, selectedUid);
    setMsgText("");
  }

  (0, _react.useEffect)(function () {
    (0, _firebaseHelper.fetchMsgs)(selectedUid, setMsgList);
  }, []);
  (0, _react.useEffect)(function () {
    var _msgEndRef$current;

    msgList.length && ((_msgEndRef$current = msgEndRef.current) === null || _msgEndRef$current === void 0 ? void 0 : _msgEndRef$current.scrollIntoView({
      behavior: "smooth"
    }));
  }, [msgList]);
  return _react.default.createElement("div", null, _react.default.createElement("div", {
    className: "messages-overflow"
  }, _react.default.createElement("div", {
    className: "chat-messages"
  }, msgList.map(function (msg, index) {
    return _react.default.createElement("p", {
      className: "chat-message message-".concat(msg.from === selectedUid ? "received" : "sent"),
      key: index
    }, msg.text);
  }), _react.default.createElement("div", {
    ref: msgEndRef
  }))), _react.default.createElement("div", {
    className: "message-write row align-center  justify-between"
  }, _react.default.createElement("input", {
    type: "text",
    name: "message",
    placeholder: "Message Text",
    value: msgText,
    onChange: function onChange(e) {
      return setMsgText(e.target.value);
    },
    onKeyUp: function onKeyUp(e) {
      return (e.which === 13 || e.keyCode === 13 || e.key === "Enter") && hendleSendMsg();
    }
  }), _react.default.createElement(SendIcon, {
    onClick: hendleSendMsg
  })));
};

var SendIcon = function SendIcon(_ref) {
  var onClick = _ref.onClick;
  return _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    x: "0",
    y: "0",
    enableBackground: "new 0 0 495.003 495.003",
    version: "1.1",
    viewBox: "0 0 495.003 495.003",
    xmlSpace: "preserve",
    className: "send-icon",
    width: 22,
    height: 22,
    onClick: onClick
  }, _react.default.createElement("g", null, _react.default.createElement("path", {
    d: "M164.711 456.687a8.007 8.007 0 004.266 7.072 7.992 7.992 0 008.245-.468l55.09-37.616-67.6-32.22v63.232z"
  }), _react.default.createElement("path", {
    d: "M492.431 32.443a8.024 8.024 0 00-5.44-2.125 7.89 7.89 0 00-3.5.816L7.905 264.422a14.154 14.154 0 00.153 25.472L133.4 349.618l250.62-205.99-219.565 220.786 156.145 74.4a14.115 14.115 0 006.084 1.376c1.768 0 3.519-.322 5.186-.977a14.188 14.188 0 007.97-7.956l154.596-390a7.968 7.968 0 00-2.005-8.814z"
  })));
};

var _default = MessagesList;
exports.default = _default;