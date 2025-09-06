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
var filesystem_exports = {};
__export(filesystem_exports, {
  filesystem: () => filesystem
});
module.exports = __toCommonJS(filesystem_exports);
var pb_1 = __toESM(require("google-protobuf"));
var grpc_1 = __toESM(require("@grpc/grpc-js"));
var filesystem;
((filesystem2) => {
  class FSEntry extends pb_1.Message {
    #one_of_decls = [[1, 2]];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("file" in data && data.file != void 0) {
          this.file = data.file;
        }
        if ("folder" in data && data.folder != void 0) {
          this.folder = data.folder;
        }
      }
    }
    get file() {
      return pb_1.Message.getWrapperField(this, File, 1);
    }
    set file(value) {
      pb_1.Message.setOneofWrapperField(this, 1, this.#one_of_decls[0], value);
    }
    get has_file() {
      return pb_1.Message.getField(this, 1) != null;
    }
    get folder() {
      return pb_1.Message.getWrapperField(this, Folder, 2);
    }
    set folder(value) {
      pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[0], value);
    }
    get has_folder() {
      return pb_1.Message.getField(this, 2) != null;
    }
    get record() {
      const cases = {
        0: "none",
        1: "file",
        2: "folder"
      };
      return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
    }
    static fromObject(data) {
      const message = new FSEntry({});
      if (data.file != null) {
        message.file = File.fromObject(data.file);
      }
      if (data.folder != null) {
        message.folder = Folder.fromObject(data.folder);
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.file != null) {
        data.file = this.file.toObject();
      }
      if (this.folder != null) {
        data.folder = this.folder.toObject();
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.has_file)
        writer.writeMessage(1, this.file, () => this.file.serialize(writer));
      if (this.has_folder)
        writer.writeMessage(2, this.folder, () => this.folder.serialize(writer));
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FSEntry();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            reader.readMessage(message.file, () => message.file = File.deserialize(reader));
            break;
          case 2:
            reader.readMessage(message.folder, () => message.folder = Folder.deserialize(reader));
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
      return FSEntry.deserialize(bytes);
    }
  }
  filesystem2.FSEntry = FSEntry;
  class File extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("name" in data && data.name != void 0) {
          this.name = data.name;
        }
        if ("size" in data && data.size != void 0) {
          this.size = data.size;
        }
      }
    }
    get name() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set name(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get size() {
      return pb_1.Message.getFieldWithDefault(this, 2, 0);
    }
    set size(value) {
      pb_1.Message.setField(this, 2, value);
    }
    static fromObject(data) {
      const message = new File({});
      if (data.name != null) {
        message.name = data.name;
      }
      if (data.size != null) {
        message.size = data.size;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.name != null) {
        data.name = this.name;
      }
      if (this.size != null) {
        data.size = this.size;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.name.length)
        writer.writeString(1, this.name);
      if (this.size != 0)
        writer.writeInt64(2, this.size);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new File();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.name = reader.readString();
            break;
          case 2:
            message.size = reader.readInt64();
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
      return File.deserialize(bytes);
    }
  }
  filesystem2.File = File;
  class Folder extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("name" in data && data.name != void 0) {
          this.name = data.name;
        }
        if ("contents" in data && data.contents != void 0) {
          this.contents = data.contents;
        }
      }
    }
    get name() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set name(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get contents() {
      return pb_1.Message.getRepeatedWrapperField(this, FSEntry, 2);
    }
    set contents(value) {
      pb_1.Message.setRepeatedWrapperField(this, 2, value);
    }
    static fromObject(data) {
      const message = new Folder({});
      if (data.name != null) {
        message.name = data.name;
      }
      if (data.contents != null) {
        message.contents = data.contents.map((item) => FSEntry.fromObject(item));
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.name != null) {
        data.name = this.name;
      }
      if (this.contents != null) {
        data.contents = this.contents.map((item) => item.toObject());
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.name.length)
        writer.writeString(1, this.name);
      if (this.contents.length)
        writer.writeRepeatedMessage(2, this.contents, (item) => item.serialize(writer));
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Folder();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.name = reader.readString();
            break;
          case 2:
            reader.readMessage(message.contents, () => pb_1.Message.addToRepeatedWrapperField(message, 2, FSEntry.deserialize(reader), FSEntry));
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
      return Folder.deserialize(bytes);
    }
  }
  filesystem2.Folder = Folder;
  class BroadcastManifest extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("contents" in data && data.contents != void 0) {
          this.contents = data.contents;
        }
      }
    }
    get contents() {
      return pb_1.Message.getRepeatedWrapperField(this, FSEntry, 1);
    }
    set contents(value) {
      pb_1.Message.setRepeatedWrapperField(this, 1, value);
    }
    static fromObject(data) {
      const message = new BroadcastManifest({});
      if (data.contents != null) {
        message.contents = data.contents.map((item) => FSEntry.fromObject(item));
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.contents != null) {
        data.contents = this.contents.map((item) => item.toObject());
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.contents.length)
        writer.writeRepeatedMessage(1, this.contents, (item) => item.serialize(writer));
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BroadcastManifest();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            reader.readMessage(message.contents, () => pb_1.Message.addToRepeatedWrapperField(message, 1, FSEntry.deserialize(reader), FSEntry));
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
      return BroadcastManifest.deserialize(bytes);
    }
  }
  filesystem2.BroadcastManifest = BroadcastManifest;
  class BroadcastRequest extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("user_id" in data && data.user_id != void 0) {
          this.user_id = data.user_id;
        }
        if ("request_id" in data && data.request_id != void 0) {
          this.request_id = data.request_id;
        }
        if ("file_path" in data && data.file_path != void 0) {
          this.file_path = data.file_path;
        }
      }
    }
    get user_id() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set user_id(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get request_id() {
      return pb_1.Message.getFieldWithDefault(this, 2, "");
    }
    set request_id(value) {
      pb_1.Message.setField(this, 2, value);
    }
    get file_path() {
      return pb_1.Message.getFieldWithDefault(this, 3, "");
    }
    set file_path(value) {
      pb_1.Message.setField(this, 3, value);
    }
    static fromObject(data) {
      const message = new BroadcastRequest({});
      if (data.user_id != null) {
        message.user_id = data.user_id;
      }
      if (data.request_id != null) {
        message.request_id = data.request_id;
      }
      if (data.file_path != null) {
        message.file_path = data.file_path;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.user_id != null) {
        data.user_id = this.user_id;
      }
      if (this.request_id != null) {
        data.request_id = this.request_id;
      }
      if (this.file_path != null) {
        data.file_path = this.file_path;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.user_id.length)
        writer.writeString(1, this.user_id);
      if (this.request_id.length)
        writer.writeString(2, this.request_id);
      if (this.file_path.length)
        writer.writeString(3, this.file_path);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BroadcastRequest();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.user_id = reader.readString();
            break;
          case 2:
            message.request_id = reader.readString();
            break;
          case 3:
            message.file_path = reader.readString();
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
      return BroadcastRequest.deserialize(bytes);
    }
  }
  filesystem2.BroadcastRequest = BroadcastRequest;
  class DownloadRequest extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("from_user" in data && data.from_user != void 0) {
          this.from_user = data.from_user;
        }
        if ("file_path" in data && data.file_path != void 0) {
          this.file_path = data.file_path;
        }
        if ("chunk_size" in data && data.chunk_size != void 0) {
          this.chunk_size = data.chunk_size;
        }
      }
    }
    get from_user() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set from_user(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get file_path() {
      return pb_1.Message.getFieldWithDefault(this, 2, "");
    }
    set file_path(value) {
      pb_1.Message.setField(this, 2, value);
    }
    get chunk_size() {
      return pb_1.Message.getFieldWithDefault(this, 3, "");
    }
    set chunk_size(value) {
      pb_1.Message.setField(this, 3, value);
    }
    static fromObject(data) {
      const message = new DownloadRequest({});
      if (data.from_user != null) {
        message.from_user = data.from_user;
      }
      if (data.file_path != null) {
        message.file_path = data.file_path;
      }
      if (data.chunk_size != null) {
        message.chunk_size = data.chunk_size;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.from_user != null) {
        data.from_user = this.from_user;
      }
      if (this.file_path != null) {
        data.file_path = this.file_path;
      }
      if (this.chunk_size != null) {
        data.chunk_size = this.chunk_size;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.from_user.length)
        writer.writeString(1, this.from_user);
      if (this.file_path.length)
        writer.writeString(2, this.file_path);
      if (this.chunk_size.length)
        writer.writeString(3, this.chunk_size);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DownloadRequest();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.from_user = reader.readString();
            break;
          case 2:
            message.file_path = reader.readString();
            break;
          case 3:
            message.chunk_size = reader.readString();
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
      return DownloadRequest.deserialize(bytes);
    }
  }
  filesystem2.DownloadRequest = DownloadRequest;
  class FileChunk extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("file_path" in data && data.file_path != void 0) {
          this.file_path = data.file_path;
        }
        if ("content" in data && data.content != void 0) {
          this.content = data.content;
        }
        if ("chunk_count" in data && data.chunk_count != void 0) {
          this.chunk_count = data.chunk_count;
        }
        if ("total_chunks" in data && data.total_chunks != void 0) {
          this.total_chunks = data.total_chunks;
        }
      }
    }
    get file_path() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set file_path(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get content() {
      return pb_1.Message.getFieldWithDefault(this, 2, new Uint8Array(0));
    }
    set content(value) {
      pb_1.Message.setField(this, 2, value);
    }
    get chunk_count() {
      return pb_1.Message.getFieldWithDefault(this, 3, 0);
    }
    set chunk_count(value) {
      pb_1.Message.setField(this, 3, value);
    }
    get total_chunks() {
      return pb_1.Message.getFieldWithDefault(this, 4, 0);
    }
    set total_chunks(value) {
      pb_1.Message.setField(this, 4, value);
    }
    static fromObject(data) {
      const message = new FileChunk({});
      if (data.file_path != null) {
        message.file_path = data.file_path;
      }
      if (data.content != null) {
        message.content = data.content;
      }
      if (data.chunk_count != null) {
        message.chunk_count = data.chunk_count;
      }
      if (data.total_chunks != null) {
        message.total_chunks = data.total_chunks;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.file_path != null) {
        data.file_path = this.file_path;
      }
      if (this.content != null) {
        data.content = this.content;
      }
      if (this.chunk_count != null) {
        data.chunk_count = this.chunk_count;
      }
      if (this.total_chunks != null) {
        data.total_chunks = this.total_chunks;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.file_path.length)
        writer.writeString(1, this.file_path);
      if (this.content.length)
        writer.writeBytes(2, this.content);
      if (this.chunk_count != 0)
        writer.writeInt64(3, this.chunk_count);
      if (this.total_chunks != 0)
        writer.writeInt64(4, this.total_chunks);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FileChunk();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.file_path = reader.readString();
            break;
          case 2:
            message.content = reader.readBytes();
            break;
          case 3:
            message.chunk_count = reader.readInt64();
            break;
          case 4:
            message.total_chunks = reader.readInt64();
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
      return FileChunk.deserialize(bytes);
    }
  }
  filesystem2.FileChunk = FileChunk;
  class UploadResponse extends pb_1.Message {
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
      const message = new UploadResponse({});
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
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UploadResponse();
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
      return UploadResponse.deserialize(bytes);
    }
  }
  filesystem2.UploadResponse = UploadResponse;
  class GetManifestRequest extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("path" in data && data.path != void 0) {
          this.path = data.path;
        }
        if ("recursive" in data && data.recursive != void 0) {
          this.recursive = data.recursive;
        }
      }
    }
    get path() {
      return pb_1.Message.getFieldWithDefault(this, 1, "");
    }
    set path(value) {
      pb_1.Message.setField(this, 1, value);
    }
    get recursive() {
      return pb_1.Message.getFieldWithDefault(this, 2, false);
    }
    set recursive(value) {
      pb_1.Message.setField(this, 2, value);
    }
    static fromObject(data) {
      const message = new GetManifestRequest({});
      if (data.path != null) {
        message.path = data.path;
      }
      if (data.recursive != null) {
        message.recursive = data.recursive;
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.path != null) {
        data.path = this.path;
      }
      if (this.recursive != null) {
        data.recursive = this.recursive;
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.path.length)
        writer.writeString(1, this.path);
      if (this.recursive != false)
        writer.writeBool(2, this.recursive);
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetManifestRequest();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            message.path = reader.readString();
            break;
          case 2:
            message.recursive = reader.readBool();
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
      return GetManifestRequest.deserialize(bytes);
    }
  }
  filesystem2.GetManifestRequest = GetManifestRequest;
  class GetManifestResponse extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
      super();
      pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], this.#one_of_decls);
      if (!Array.isArray(data) && typeof data == "object") {
        if ("contents" in data && data.contents != void 0) {
          this.contents = data.contents;
        }
      }
    }
    get contents() {
      return pb_1.Message.getRepeatedWrapperField(this, FSEntry, 1);
    }
    set contents(value) {
      pb_1.Message.setRepeatedWrapperField(this, 1, value);
    }
    static fromObject(data) {
      const message = new GetManifestResponse({});
      if (data.contents != null) {
        message.contents = data.contents.map((item) => FSEntry.fromObject(item));
      }
      return message;
    }
    toObject() {
      const data = {};
      if (this.contents != null) {
        data.contents = this.contents.map((item) => item.toObject());
      }
      return data;
    }
    serialize(w) {
      const writer = w || new pb_1.BinaryWriter();
      if (this.contents.length)
        writer.writeRepeatedMessage(1, this.contents, (item) => item.serialize(writer));
      if (!w)
        return writer.getResultBuffer();
    }
    static deserialize(bytes) {
      const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetManifestResponse();
      while (reader.nextField()) {
        if (reader.isEndGroup())
          break;
        switch (reader.getFieldNumber()) {
          case 1:
            reader.readMessage(message.contents, () => pb_1.Message.addToRepeatedWrapperField(message, 1, FSEntry.deserialize(reader), FSEntry));
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
      return GetManifestResponse.deserialize(bytes);
    }
  }
  filesystem2.GetManifestResponse = GetManifestResponse;
  class UnimplementedFilesystemService {
    static definition = {
      Broadcast: {
        path: "/filesystem.Filesystem/Broadcast",
        requestStream: false,
        responseStream: true,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => BroadcastManifest.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => BroadcastRequest.deserialize(new Uint8Array(bytes))
      },
      GetManifest: {
        path: "/filesystem.Filesystem/GetManifest",
        requestStream: false,
        responseStream: false,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => GetManifestRequest.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => GetManifestResponse.deserialize(new Uint8Array(bytes))
      },
      Download: {
        path: "/filesystem.Filesystem/Download",
        requestStream: false,
        responseStream: true,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => DownloadRequest.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => FileChunk.deserialize(new Uint8Array(bytes))
      },
      Upload: {
        path: "/filesystem.Filesystem/Upload",
        requestStream: true,
        responseStream: false,
        requestSerialize: (message) => Buffer.from(message.serialize()),
        requestDeserialize: (bytes) => FileChunk.deserialize(new Uint8Array(bytes)),
        responseSerialize: (message) => Buffer.from(message.serialize()),
        responseDeserialize: (bytes) => UploadResponse.deserialize(new Uint8Array(bytes))
      }
    };
  }
  filesystem2.UnimplementedFilesystemService = UnimplementedFilesystemService;
  class FilesystemClient extends grpc_1.makeGenericClientConstructor(UnimplementedFilesystemService.definition, "Filesystem", {}) {
    constructor(address, credentials, options) {
      super(address, credentials, options);
    }
    Broadcast = (message, metadata, options) => {
      return super.Broadcast(message, metadata, options);
    };
    GetManifest = (message, metadata, options, callback) => {
      return super.GetManifest(message, metadata, options, callback);
    };
    Download = (message, metadata, options) => {
      return super.Download(message, metadata, options);
    };
    Upload = (metadata, options, callback) => {
      return super.Upload(metadata, options, callback);
    };
  }
  filesystem2.FilesystemClient = FilesystemClient;
})(filesystem || (filesystem = {}));
