"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultAvatar = function DefaultAvatar() {
  return _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "default-avatar",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, _react.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
    clipRule: "evenodd"
  }));
};

var _default = DefaultAvatar;
exports.default = _default;