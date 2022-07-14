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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var createContext_exports = {};
__export(createContext_exports, {
  createContext: () => createContext
});
module.exports = __toCommonJS(createContext_exports);
var import_prisma = require("../prisma/prisma");
var import_jwt = require("../utils/jwt");
const getUserFromReq = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const verified = (0, import_jwt.verifyJwt)(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
  return null;
};
function createContext({
  req,
  res
}) {
  const user = getUserFromReq(req);
  return {
    req,
    res,
    prisma: import_prisma.prisma,
    user
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createContext
});
