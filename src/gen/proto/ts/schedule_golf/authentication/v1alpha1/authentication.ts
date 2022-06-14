// @generated by protobuf-ts 2.2.2 with parameter long_type_number
// @generated from protobuf file "schedule_golf/authentication/v1alpha1/authentication.proto" (package "schedule_golf.authentication.v1alpha1", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf message schedule_golf.authentication.v1alpha1.CreateNewUserRequest
 */
export interface CreateNewUserRequest {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from protobuf field: string company_name = 2;
     */
    companyName: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
    /**
     * @generated from protobuf field: string password = 4;
     */
    password: string;
    /**
     * @generated from protobuf field: string first_name = 5;
     */
    firstName: string;
    /**
     * @generated from protobuf field: string last_name = 6;
     */
    lastName: string;
}
/**
 * @generated from protobuf message schedule_golf.authentication.v1alpha1.CreateNewUserResponse
 */
export interface CreateNewUserResponse {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from protobuf field: string company_name = 2;
     */
    companyName: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
    /**
     * @generated from protobuf field: string first_name = 4;
     */
    firstName: string;
    /**
     * @generated from protobuf field: string last_name = 5;
     */
    lastName: string;
}
/**
 * @generated from protobuf message schedule_golf.authentication.v1alpha1.GetRefreshTokenRequest
 */
export interface GetRefreshTokenRequest {
}
/**
 * @generated from protobuf message schedule_golf.authentication.v1alpha1.GetRefreshTokenResponse
 */
export interface GetRefreshTokenResponse {
}
// @generated message type with reflection information, may provide speed optimized methods
class CreateNewUserRequest$Type extends MessageType<CreateNewUserRequest> {
    constructor() {
        super("schedule_golf.authentication.v1alpha1.CreateNewUserRequest", [
            { no: 1, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "company_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "first_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "last_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CreateNewUserRequest>): CreateNewUserRequest {
        const message = { userId: "", companyName: "", email: "", password: "", firstName: "", lastName: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateNewUserRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateNewUserRequest): CreateNewUserRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string user_id */ 1:
                    message.userId = reader.string();
                    break;
                case /* string company_name */ 2:
                    message.companyName = reader.string();
                    break;
                case /* string email */ 3:
                    message.email = reader.string();
                    break;
                case /* string password */ 4:
                    message.password = reader.string();
                    break;
                case /* string first_name */ 5:
                    message.firstName = reader.string();
                    break;
                case /* string last_name */ 6:
                    message.lastName = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateNewUserRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string user_id = 1; */
        if (message.userId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.userId);
        /* string company_name = 2; */
        if (message.companyName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.companyName);
        /* string email = 3; */
        if (message.email !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.email);
        /* string password = 4; */
        if (message.password !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.password);
        /* string first_name = 5; */
        if (message.firstName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.firstName);
        /* string last_name = 6; */
        if (message.lastName !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.lastName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message schedule_golf.authentication.v1alpha1.CreateNewUserRequest
 */
export const CreateNewUserRequest = new CreateNewUserRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CreateNewUserResponse$Type extends MessageType<CreateNewUserResponse> {
    constructor() {
        super("schedule_golf.authentication.v1alpha1.CreateNewUserResponse", [
            { no: 1, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "company_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "first_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "last_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CreateNewUserResponse>): CreateNewUserResponse {
        const message = { userId: "", companyName: "", email: "", firstName: "", lastName: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateNewUserResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateNewUserResponse): CreateNewUserResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string user_id */ 1:
                    message.userId = reader.string();
                    break;
                case /* string company_name */ 2:
                    message.companyName = reader.string();
                    break;
                case /* string email */ 3:
                    message.email = reader.string();
                    break;
                case /* string first_name */ 4:
                    message.firstName = reader.string();
                    break;
                case /* string last_name */ 5:
                    message.lastName = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateNewUserResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string user_id = 1; */
        if (message.userId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.userId);
        /* string company_name = 2; */
        if (message.companyName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.companyName);
        /* string email = 3; */
        if (message.email !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.email);
        /* string first_name = 4; */
        if (message.firstName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.firstName);
        /* string last_name = 5; */
        if (message.lastName !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.lastName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message schedule_golf.authentication.v1alpha1.CreateNewUserResponse
 */
export const CreateNewUserResponse = new CreateNewUserResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetRefreshTokenRequest$Type extends MessageType<GetRefreshTokenRequest> {
    constructor() {
        super("schedule_golf.authentication.v1alpha1.GetRefreshTokenRequest", []);
    }
    create(value?: PartialMessage<GetRefreshTokenRequest>): GetRefreshTokenRequest {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetRefreshTokenRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetRefreshTokenRequest): GetRefreshTokenRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: GetRefreshTokenRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message schedule_golf.authentication.v1alpha1.GetRefreshTokenRequest
 */
export const GetRefreshTokenRequest = new GetRefreshTokenRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetRefreshTokenResponse$Type extends MessageType<GetRefreshTokenResponse> {
    constructor() {
        super("schedule_golf.authentication.v1alpha1.GetRefreshTokenResponse", []);
    }
    create(value?: PartialMessage<GetRefreshTokenResponse>): GetRefreshTokenResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetRefreshTokenResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetRefreshTokenResponse): GetRefreshTokenResponse {
        return target ?? this.create();
    }
    internalBinaryWrite(message: GetRefreshTokenResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message schedule_golf.authentication.v1alpha1.GetRefreshTokenResponse
 */
export const GetRefreshTokenResponse = new GetRefreshTokenResponse$Type();
/**
 * @generated ServiceType for protobuf service schedule_golf.authentication.v1alpha1.AuthenticatorService
 */
export const AuthenticatorService = new ServiceType("schedule_golf.authentication.v1alpha1.AuthenticatorService", [
    { name: "CreateNewUser", options: {}, I: CreateNewUserRequest, O: CreateNewUserResponse },
    { name: "GetRefreshToken", options: {}, I: GetRefreshTokenRequest, O: GetRefreshTokenResponse }
]);
