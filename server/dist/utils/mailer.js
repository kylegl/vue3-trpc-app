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
var mailer_exports = {};
__export(mailer_exports, {
  sendLoginEmail: () => sendLoginEmail
});
module.exports = __toCommonJS(mailer_exports);
var import_nodemailer = __toESM(require("nodemailer"));
function sendLoginEmail(_0) {
  return __async(this, arguments, function* ({ email, url, token }) {
    const testAccount = yield import_nodemailer.default.createTestAccount();
    const transporter = import_nodemailer.default.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    const info = yield transporter.sendMail({
      from: '"Fred Foo \u{1F47B}" <j.doe@example.com>',
      to: email,
      subject: "Yooo! Welcome to the party",
      html: `Verify your email address by clicking <a href="${url}/login#token=${token}">here</a>`
    });
    console.log(`Preview URL: ${import_nodemailer.default.getTestMessageUrl(info)}`);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendLoginEmail
});
