import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import type { CallContext, CallOptions } from "nice-grpc-common";
export interface User {
    id: string;
    name: string;
}
export interface LoginRequest {
    username: string;
}
export interface AuthInfo {
    token: string;
    user: User | undefined;
}
export interface LogoutRequest {
    userId: string;
}
export interface LogoutResponse {
    success: boolean;
}
export interface WhoamiRequest {
}
export interface WhoamiResponse {
    user: User | undefined;
}
export declare const User: MessageFns<User>;
export declare const LoginRequest: MessageFns<LoginRequest>;
export declare const AuthInfo: MessageFns<AuthInfo>;
export declare const LogoutRequest: MessageFns<LogoutRequest>;
export declare const LogoutResponse: MessageFns<LogoutResponse>;
export declare const WhoamiRequest: MessageFns<WhoamiRequest>;
export declare const WhoamiResponse: MessageFns<WhoamiResponse>;
export type AuthenticationDefinition = typeof AuthenticationDefinition;
export declare const AuthenticationDefinition: {
    readonly name: "Authentication";
    readonly fullName: "identity.Authentication";
    readonly methods: {
        readonly whoami: {
            readonly name: "Whoami";
            readonly requestType: MessageFns<WhoamiRequest>;
            readonly requestStream: false;
            readonly responseType: MessageFns<WhoamiResponse>;
            readonly responseStream: false;
            readonly options: {};
        };
        readonly connect: {
            readonly name: "Connect";
            readonly requestType: MessageFns<LoginRequest>;
            readonly requestStream: false;
            readonly responseType: MessageFns<AuthInfo>;
            readonly responseStream: true;
            readonly options: {};
        };
    };
};
export interface AuthenticationServiceImplementation<CallContextExt = {}> {
    whoami(request: WhoamiRequest, context: CallContext & CallContextExt): Promise<DeepPartial<WhoamiResponse>>;
    connect(request: LoginRequest, context: CallContext & CallContextExt): ServerStreamingMethodResult<DeepPartial<AuthInfo>>;
}
export interface AuthenticationClient<CallOptionsExt = {}> {
    whoami(request: DeepPartial<WhoamiRequest>, options?: CallOptions & CallOptionsExt): Promise<WhoamiResponse>;
    connect(request: DeepPartial<LoginRequest>, options?: CallOptions & CallOptionsExt): AsyncIterable<AuthInfo>;
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
