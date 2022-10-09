"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _myStore = _interopRequireDefault(require("./redaxToolkit/myStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    myState: _myStore["default"]
  }
});
exports.store = store;
//# sourceMappingURL=store.dev.js.map
