"use strict";
exports.__esModule = true;
var server_1 = require("./server/server");
var server = server_1["default"].init(3001);
server.start(function () {
    console.log("Servidor arriba");
});
