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
var chat_exports = {};
__export(chat_exports, {
  chat: () => chat
});
module.exports = __toCommonJS(chat_exports);
var dependency_1 = __toESM(require("./../identity/identity"));
var pb_1 = __toESM(require("google-protobuf"));
var grpc_1 = __toESM(require("@grpc/grpc-js"));
var chat;
((chat2) => {
  class ChatMessage extends pb_1.Message {
    #one_of_decls = [[1, 2]];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("room_id" in data && data.room_id != void 0) {
          this.room_id = data.room_id;
        }
        if ("user_id" in data && data.user_id != void 0) {
          this.user_id = data.user_id;
        }
        if ("author" in data && data.author != void 0) {
          this.author = data.author;
        }
        if ("content" in data && data.content != void 0) {
          this.content = data.content;
        }
        if ("timestamp" in data && data.timestamp != void 0) {
          this.timestamp = data.timestamp;
        }
      }
    }
    get room_id() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set room_id(value) {
      pb_1.Message.setOneofField(this, 1, this.#one_of_decls[0], value);
    }
    get has_room_id() {
      return pb_1.Message.getField(this, 1) != null;
    }
    get user_id() {
      return pb_1.Message.getFieldWithDefault(this, 2, "");
    }
    set user_id(value) {
      pb_1.Message.setOneofField(this, 2, this.#one_of_decls[0], value);
    }
    get has_user_id() {
      return pb_1.Message.getField(this, 2) != null;
    }
    get author() {
      return pb_1.Message.getWrapperField(this, dependency_1.identity.User, 3);
    }
    set author(value) {
      pb_1.Message.setWrapperField(this, 3, value);
    }
    get has_author() {
      return pb_1.Message.getField(this, 3) != null;
    }
    get content() {
      return pb_1.Message.getFieldWithDefault(this, 4, "");
    }
    set content(value) {
      pb_1.Message.setField(this, 4, value);
    }
    get timestamp() {
      return pb_1.Message.getFieldWithDefault(this, 5, 0);
    }
    set timestamp(value) {
      pb_1.Message.setField(this, 5, value);
    }
    get target() {
      const cases = {
        0: "none",
        1: "room_id",
        2: "user_id"
      };
      return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
    }
    static fromObject(data) {
      const message = new ChatMessage({});
      if (data.room_id != null) {
        message.room_id = data.room_id;
      }
      if (data.user_id != null) {
        message.user_id = data.user_id;
      }
      if (data.author != null) {
        message.author = dependency_1.identity.User.fromObject(data.author);
      }
      if (data.content != null) {
        message.content = data.content;
      }
      if (data.timestamp != null) {
        message.timestamp = data.timestamp;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.room_id != null) {
        data.room_id = this.room_id;
      }
      if (this.user_id != null) {
        data.user_id = this.user_id;
      }
      if (this.author != null) {
        data.author = this.author.toObject();
      }
      if (this.content != null) {
        data.content = this.content;
      }
      if (this.timestamp != null) {
        data.timestamp = this.timestamp;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.has_room_id)
        writer.writeString(1, this.room_id);
      if (this.has_user_id)
        writer.writeString(2, this.user_id);
      if (this.has_author)
        writer.writeMessage(3, this.author, () => this.author.serialize(writer));
      if (this.content.length)
        writer.writeString(4, this.content);
      if (this.timestamp != 0)
        writer.writeInt64(5, this.timestamp);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChatMessage();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.room_id = reader.readString();
            break;
          case 2:
            message.user_id = reader.readString();
            break;
          case 3:
            reader.readMessage(message.author, () => message.author = dependency_1.identity.User.deserialize(reader));
            break;
          case 4:
            message.content = reader.readString();
            break;
          case 5:
            message.timestamp = reader.readInt64();
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
      return ChatMessage.deserialize(bytes);
    }
  }
  chat2.ChatMessage = ChatMessage;
  class UnimplementedChatService {
    static definition = {
      JoinRoom: {
        path: "/chat.Chat/JoinRoom",
        requestStream: true,
        responseStream: true,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => ChatMessage.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => ChatMessage.deserialize(new Uint8Array(bytes))
      }
    };
  }
  chat2.UnimplementedChatService = UnimplementedChatService;
  class ChatClient extends grpc_1.makeGenericClientConstructor(UnimplementedChatService.definition, "Chat", {}) {
    constructor(address, credentials, options) {
      super(address, credentials, options);
    }
    JoinRoom = (metadata, options) => {
      return super.JoinRoom(metadata, options);
    };
  }
  chat2.ChatClient = ChatClient;
})(chat || (chat = {}));
