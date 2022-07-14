"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var app_router_exports = {};
__export(app_router_exports, {
  appRouter: () => appRouter
});
module.exports = __toCommonJS(app_router_exports);
var import_createRouter = require("../createRouter");
var import_user = require("./user.router");
__reExport(app_router_exports, require("../createContext"), module.exports);
const appRouter = (0, import_createRouter.createRouter)().merge("users.", import_user.userRouter);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appRouter
});
