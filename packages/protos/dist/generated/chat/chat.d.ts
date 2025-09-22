import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import type { CallContext, CallOptions } from "nice-grpc-common";
import { User } from "../identity/identity";
export interface JoinRoom {
    roomId: string;
}
export interface Message {
    roomId?: string | undefined;
    userId?: string | undefined;
    content: string;
}
export interface LeaveRoom {
    roomId: string;
}
export interface Send {
    join?: JoinRoom | undefined;
    leave?: LeaveRoom | undefined;
    message?: Message | undefined;
}
export interface ChatMessage {
    roomId?: string | undefined;
    userId?: string | undefined;
    author: User | undefined;
    content: string;
    timestamp: number;
}
export declare const JoinRoom: MessageFns<JoinRoom>;
export declare const Message: MessageFns<Message>;
export declare const LeaveRoom: MessageFns<LeaveRoom>;
export declare const Send: MessageFns<Send>;
export declare const ChatMessage: MessageFns<ChatMessage>;
export type ChatDefinition = typeof ChatDefinition;
export declare const ChatDefinition: {
    readonly name: "Chat";
    readonly fullName: "chat.Chat";
    readonly methods: {
        readonly connect: {
            readonly name: "Connect";
            readonly requestType: MessageFns<Send>;
            readonly requestStream: true;
            readonly responseType: MessageFns<ChatMessage>;
            readonly responseStream: true;
            readonly options: {};
        };
    };
};
export interface ChatServiceImplementation<CallContextExt = {}> {
    connect(request: AsyncIterable<Send>, context: CallContext & CallContextExt): ServerStreamingMethodResult<DeepPartial<ChatMessage>>;
}
export interface ChatClient<CallOptionsExt = {}> {
    connect(request: AsyncIterable<DeepPartial<Send>>, options?: CallOptions & CallOptionsExt): AsyncIterable<ChatMessage>;
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
