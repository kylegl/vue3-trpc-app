"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var trpcExpress = __toESM(require("@trpc/server/adapters/express"));
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_createContext = require("./trpc/createContext");
var import_app = require("./trpc/route/app.router");
const app = (0, import_express.default)();
app.use((0, import_cors.default)());
app.use((req, _res, next) => {
  var _a;
  console.log("\u2B05\uFE0F ", req.method, req.path, (_a = req.body) != null ? _a : req.query);
  _res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/trpc", trpcExpress.createExpressMiddleware({
  router: import_app.appRouter,
  createContext: import_createContext.createContext
}));
app.get("/", (_req, res) => res.send("hello"));
app.listen(2022, () => {
  console.log("listening on port 2022");
});
