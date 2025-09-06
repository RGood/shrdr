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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
module.exports = __toCommonJS(identity_exports);
var pb_1 = __toESM(require("google-protobuf"));
var grpc_1 = __toESM(require("@grpc/grpc-js"));
var identity;
((identity2) => {
  class User extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("id" in data && data.id != void 0) {
          this.id = data.id;
        }
        if ("name" in data && data.name != void 0) {
          this.name = data.name;
        }
      }
    }
    get id() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set id(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get name() {
      return pb_1.Message.getFieldWithDefault(this, 2, "");
    }
    set name(value) {
      pb_1.Message.setField(this, 2, value);
    }
    static fromObject(data) {
      const message = new User({});
      if (data.id != null) {
        message.id = data.id;
      }
      if (data.name != null) {
        message.name = data.name;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.id != null) {
        data.id = this.id;
      }
      if (this.name != null) {
        data.name = this.name;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.id.length)
        writer.writeString(1, this.id);
      if (this.name.length)
        writer.writeString(2, this.name);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new User();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.id = reader.readString();
            break;
          case 2:
            message.name = reader.readString();
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary() {
      return this.serialize();
    }
    static deserializeBinary(bytes) {
      return User.deserialize(bytes);
    }
  }
  identity2.User = User;
  class LoginRequest extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("username" in data && data.username != void 0) {
          this.username = data.username;
        }
      }
    }
    get username() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set username(value) {
      pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data) {
      const message = new LoginRequest({});
      if (data.username != null) {
        message.username = data.username;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.username != null) {
        data.username = this.username;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.username.length)
        writer.writeString(1, this.username);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LoginRequest();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.username = reader.readString();
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary() {
      return this.serialize();
    }
    static deserializeBinary(bytes) {
      return LoginRequest.deserialize(bytes);
    }
  }
  identity2.LoginRequest = LoginRequest;
  class LoginResponse extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("user" in data && data.user != void 0) {
          this.user = data.user;
        }
        if ("token" in data && data.token != void 0) {
          this.token = data.token;
        }
      }
    }
    get user() {
      return pb_1.Message.getWrapperField(this, User, 1);
    }
    set user(value) {
      pb_1.Message.setWrapperField(this, 1, value);
    }
    get has_user() {
      return pb_1.Message.getField(this, 1) != null;
    }
    get token() {
      return pb_1.Message.getFieldWithDefault(this, 2, "");
    }
    set token(value) {
      pb_1.Message.setField(this, 2, value);
    }
    static fromObject(data) {
      const message = new LoginResponse({});
      if (data.user != null) {
        message.user = User.fromObject(data.user);
      }
      if (data.token != null) {
        message.token = data.token;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.user != null) {
        data.user = this.user.toObject();
      }
      if (this.token != null) {
        data.token = this.token;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.has_user)
        writer.writeMessage(1, this.user, () => this.user.serialize(writer));
      if (this.token.length)
        writer.writeString(2, this.token);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LoginResponse();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            reader.readMessage(message.user, () => message.user = User.deserialize(reader));
            break;
          case 2:
            message.token = reader.readString();
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary() {
      return this.serialize();
    }
    static deserializeBinary(bytes) {
      return LoginResponse.deserialize(bytes);
    }
  }
  identity2.LoginResponse = LoginResponse;
  class LogoutRequest extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("user_id" in data && data.user_id != void 0) {
          this.user_id = data.user_id;
        }
      }
    }
    get user_id() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set user_id(value) {
      pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data) {
      const message = new LogoutRequest({});
      if (data.user_id != null) {
        message.user_id = data.user_id;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.user_id != null) {
        data.user_id = this.user_id;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.user_id.length)
        writer.writeString(1, this.user_id);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LogoutRequest();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.user_id = reader.readString();
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary() {
      return this.serialize();
    }
    static deserializeBinary(bytes) {
      return LogoutRequest.deserialize(bytes);
    }
  }
  identity2.LogoutRequest = LogoutRequest;
  class LogoutResponse extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("success" in data && data.success != void 0) {
          this.success = data.success;
        }
      }
    }
    get success() {
      return pb_1.Message.getFieldWithDefault(this, 1, false);
    }
    set success(value) {
      pb_1.Message.setField(this, 1, value);
    }
    static fromObject(data) {
      const message = new LogoutResponse({});
      if (data.success != null) {
        message.success = data.success;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.success != null) {
        data.success = this.success;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.success != false)
        writer.writeBool(1, this.success);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LogoutResponse();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.success = reader.readBool();
            break;
          default:
            reader.skipField();
        }
      }
      return message;
    }
    serializeBinary() {
      return this.serialize();
    }
    static deserializeBinary(bytes) {
      return LogoutResponse.deserialize(bytes);
    }
  }
  identity2.LogoutResponse = LogoutResponse;
  class UnimplementedAuthenticationService {
    static definition = {
      Login: {
        path: "/identity.Authentication/Login",
        requestStream: false,
        responseStream: false,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => LoginRequest.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => LoginResponse.deserialize(new Uint8Array(bytes))
      },
      Logout: {
        path: "/identity.Authentication/Logout",
        requestStream: false,
        responseStream: false,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => LogoutRequest.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => LogoutResponse.deserialize(new Uint8Array(bytes))
      }
    };
  }
  identity2.UnimplementedAuthenticationService = UnimplementedAuthenticationService;
  class AuthenticationClient extends grpc_1.makeGenericClientConstructor(UnimplementedAuthenticationService.definition, "Authentication", {}) {
    constructor(address, credentials, options) {
      super(address, credentials, options);
    }
    Login = (message, metadata, options, callback) => {
      return super.Login(message, metadata, options, callback);
    };
    Logout = (message, metadata, options, callback) => {
      return super.Logout(message, metadata, options, callback);
    };
  }
  identity2.AuthenticationClient = AuthenticationClient;
})(identity || (identity = {}));
