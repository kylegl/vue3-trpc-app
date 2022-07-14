"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var user_router_exports = {};
__export(user_router_exports, {
  userRouter: () => userRouter
});
module.exports = __toCommonJS(user_router_exports);
var import_runtime = require("@prisma/client/runtime");
var trpc = __toESM(require("@trpc/server"));
var import_createRouter = require("../createRouter");
var import_user = require("../../schema/user.schema");
const userRouter = (0, import_createRouter.createRouter)().mutation("register-user", {
  input: import_user.createUserSchema,
  resolve(_0) {
    return __async(this, arguments, function* ({ ctx, input }) {
      const { email, name } = input;
      try {
        const user = yield ctx.prisma.user.create({
          data: {
            email,
            name
          }
        });
        return user;
      } catch (err) {
        if (err instanceof import_runtime.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User already exists"
            });
          }
        }
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Do you smell smoke?"
        });
      }
    });
  }
}).query("get-users", {
  resolve: (_0) => __async(void 0, [_0], function* ({ ctx }) {
    const users = yield ctx.prisma.user.findMany();
    return users;
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouter
});