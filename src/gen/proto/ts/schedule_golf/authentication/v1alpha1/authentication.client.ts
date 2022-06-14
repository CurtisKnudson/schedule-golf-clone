// @generated by protobuf-ts 2.2.2 with parameter long_type_number
// @generated from protobuf file "schedule_golf/authentication/v1alpha1/authentication.proto" (package "schedule_golf.authentication.v1alpha1", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";

import type { GetRefreshTokenResponse } from "./authentication";
import type { GetRefreshTokenRequest } from "./authentication";
import type { CreateNewUserResponse } from "./authentication";
import type { CreateNewUserRequest } from "./authentication";
import { AuthenticatorService } from "./authentication";
/**
 * @generated from protobuf service schedule_golf.authentication.v1alpha1.AuthenticatorService
 */
export interface IAuthenticatorServiceClient {
    /**
     * @generated from protobuf rpc: CreateNewUser(schedule_golf.authentication.v1alpha1.CreateNewUserRequest) returns (schedule_golf.authentication.v1alpha1.CreateNewUserResponse);
     */
    createNewUser(input: CreateNewUserRequest, options?: RpcOptions): UnaryCall<CreateNewUserRequest, CreateNewUserResponse>;
    /**
     * @generated from protobuf rpc: GetRefreshToken(schedule_golf.authentication.v1alpha1.GetRefreshTokenRequest) returns (schedule_golf.authentication.v1alpha1.GetRefreshTokenResponse);
     */
    getRefreshToken(input: GetRefreshTokenRequest, options?: RpcOptions): UnaryCall<GetRefreshTokenRequest, GetRefreshTokenResponse>;
}
/**
 * @generated from protobuf service schedule_golf.authentication.v1alpha1.AuthenticatorService
 */
export class AuthenticatorServiceClient implements IAuthenticatorServiceClient, ServiceInfo {
    typeName = AuthenticatorService.typeName;
    methods = AuthenticatorService.methods;
    options = AuthenticatorService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: CreateNewUser(schedule_golf.authentication.v1alpha1.CreateNewUserRequest) returns (schedule_golf.authentication.v1alpha1.CreateNewUserResponse);
     */
    createNewUser(input: CreateNewUserRequest, options?: RpcOptions): UnaryCall<CreateNewUserRequest, CreateNewUserResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateNewUserRequest, CreateNewUserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetRefreshToken(schedule_golf.authentication.v1alpha1.GetRefreshTokenRequest) returns (schedule_golf.authentication.v1alpha1.GetRefreshTokenResponse);
     */
    getRefreshToken(input: GetRefreshTokenRequest, options?: RpcOptions): UnaryCall<GetRefreshTokenRequest, GetRefreshTokenResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetRefreshTokenRequest, GetRefreshTokenResponse>("unary", this._transport, method, opt, input);
    }
}
