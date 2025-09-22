import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import type { CallContext, CallOptions } from "nice-grpc-common";
export interface FSEntry {
    file?: File | undefined;
    folder?: Folder | undefined;
}
export interface File {
    name: string;
    size: number;
}
export interface Folder {
    name: string;
    contents: FSEntry[];
}
export interface BroadcastManifest {
    contents: FSEntry[];
}
/** Upstream requests for data */
export interface BroadcastRequest {
    userId: string;
    requestId: string;
    filePath: string;
}
export interface DownloadRequest {
    fromUser: string;
    filePath: string;
    chunkSize: string;
}
export interface FileChunk {
    filePath: string;
    content: Uint8Array;
    chunkCount: number;
    totalChunks: number;
}
export interface UploadResponse {
    success: boolean;
}
export interface GetManifestRequest {
    path: string;
    recursive: boolean;
}
export interface GetManifestResponse {
    contents: FSEntry[];
}
export declare const FSEntry: MessageFns<FSEntry>;
export declare const File: MessageFns<File>;
export declare const Folder: MessageFns<Folder>;
export declare const BroadcastManifest: MessageFns<BroadcastManifest>;
export declare const BroadcastRequest: MessageFns<BroadcastRequest>;
export declare const DownloadRequest: MessageFns<DownloadRequest>;
export declare const FileChunk: MessageFns<FileChunk>;
export declare const UploadResponse: MessageFns<UploadResponse>;
export declare const GetManifestRequest: MessageFns<GetManifestRequest>;
export declare const GetManifestResponse: MessageFns<GetManifestResponse>;
export type FilesystemDefinition = typeof FilesystemDefinition;
export declare const FilesystemDefinition: {
    readonly name: "Filesystem";
    readonly fullName: "filesystem.Filesystem";
    readonly methods: {
        /** Offer files for streaming. Receive download requests as a BroadcastRequest */
        readonly broadcast: {
            readonly name: "Broadcast";
            readonly requestType: MessageFns<BroadcastManifest>;
            readonly requestStream: false;
            readonly responseType: MessageFns<BroadcastRequest>;
            readonly responseStream: true;
            readonly options: {};
        };
        /** List available download sources */
        readonly getManifest: {
            readonly name: "GetManifest";
            readonly requestType: MessageFns<GetManifestRequest>;
            readonly requestStream: false;
            readonly responseType: MessageFns<GetManifestResponse>;
            readonly responseStream: false;
            readonly options: {};
        };
        /**
         * Download initiates a download stream.
         * Notifies target client with BroadcastRequest.
         */
        readonly download: {
            readonly name: "Download";
            readonly requestType: MessageFns<DownloadRequest>;
            readonly requestStream: false;
            readonly responseType: MessageFns<FileChunk>;
            readonly responseStream: true;
            readonly options: {};
        };
        /** Upload initiates an upload stream attempting to fulfill a BroadcastRequest. */
        readonly upload: {
            readonly name: "Upload";
            readonly requestType: MessageFns<FileChunk>;
            readonly requestStream: true;
            readonly responseType: MessageFns<UploadResponse>;
            readonly responseStream: false;
            readonly options: {};
        };
    };
};
export interface FilesystemServiceImplementation<CallContextExt = {}> {
    /** Offer files for streaming. Receive download requests as a BroadcastRequest */
    broadcast(request: BroadcastManifest, context: CallContext & CallContextExt): ServerStreamingMethodResult<DeepPartial<BroadcastRequest>>;
    /** List available download sources */
    getManifest(request: GetManifestRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetManifestResponse>>;
    /**
     * Download initiates a download stream.
     * Notifies target client with BroadcastRequest.
     */
    download(request: DownloadRequest, context: CallContext & CallContextExt): ServerStreamingMethodResult<DeepPartial<FileChunk>>;
    /** Upload initiates an upload stream attempting to fulfill a BroadcastRequest. */
    upload(request: AsyncIterable<FileChunk>, context: CallContext & CallContextExt): Promise<DeepPartial<UploadResponse>>;
}
export interface FilesystemClient<CallOptionsExt = {}> {
    /** Offer files for streaming. Receive download requests as a BroadcastRequest */
    broadcast(request: DeepPartial<BroadcastManifest>, options?: CallOptions & CallOptionsExt): AsyncIterable<BroadcastRequest>;
    /** List available download sources */
    getManifest(request: DeepPartial<GetManifestRequest>, options?: CallOptions & CallOptionsExt): Promise<GetManifestResponse>;
    /**
     * Download initiates a download stream.
     * Notifies target client with BroadcastRequest.
     */
    download(request: DeepPartial<DownloadRequest>, options?: CallOptions & CallOptionsExt): AsyncIterable<FileChunk>;
    /** Upload initiates an upload stream attempting to fulfill a BroadcastRequest. */
    upload(request: AsyncIterable<DeepPartial<FileChunk>>, options?: CallOptions & CallOptionsExt): Promise<UploadResponse>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type ServerStreamingMethodResult<Response> = {
    [Symbol.asyncIterator](): AsyncIterator<Response, void>;
};
interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    create(base?: DeepPartial<T>): T;
    fromPartial(object: DeepPartial<T>): T;
}
export {};
