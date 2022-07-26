// @generated by protobuf-ts 2.2.2 with parameter long_type_number,generate_dependencies
// @generated from protobuf file "schedule_golf/authentication/v1alpha1/authentication.proto" (package "schedule_golf.authentication.v1alpha1", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { AuthenticatorService } from "./authentication";
import type { ForeUpAuthenticationResponse } from "./authentication";
import type { ForeUpAuthenticationRequest } from "./authentication";
import type { UserTokenRefreshResponse } from "./authentication";
import type { UserTokenRefreshRequest } from "./authentication";
import type { CreateNewUserResponse } from "./authentication";
import type { CreateNewUserRequest } from "./authentication";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { UserLoginResponse } from "./authentication";
import type { UserLoginRequest } from "./authentication";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service schedule_golf.authentication.v1alpha1.AuthenticatorService
 */
export interface IAuthenticatorServiceClient {
    /**
     * @generated from protobuf rpc: UserLogin(schedule_golf.authentication.v1alpha1.UserLoginRequest) returns (schedule_golf.authentication.v1alpha1.UserLoginResponse);
     */
    userLogin(input: UserLoginRequest, options?: RpcOptions): UnaryCall<UserLoginRequest, UserLoginResponse>;
    /**
     * @generated from protobuf rpc: CreateNewUser(schedule_golf.authentication.v1alpha1.CreateNewUserRequest) returns (schedule_golf.authentication.v1alpha1.CreateNewUserResponse);
     */
    createNewUser(input: CreateNewUserRequest, options?: RpcOptions): UnaryCall<CreateNewUserRequest, CreateNewUserResponse>;
    /**
     * @generated from protobuf rpc: UserTokenRefresh(schedule_golf.authentication.v1alpha1.UserTokenRefreshRequest) returns (schedule_golf.authentication.v1alpha1.UserTokenRefreshResponse);
     */
    userTokenRefresh(input: UserTokenRefreshRequest, options?: RpcOptions): UnaryCall<UserTokenRefreshRequest, UserTokenRefreshResponse>;
    /**
     * @generated from protobuf rpc: ForeUpAuthentication(schedule_golf.authentication.v1alpha1.ForeUpAuthenticationRequest) returns (schedule_golf.authentication.v1alpha1.ForeUpAuthenticationResponse);
     */
    foreUpAuthentication(input: ForeUpAuthenticationRequest, options?: RpcOptions): UnaryCall<ForeUpAuthenticationRequest, ForeUpAuthenticationResponse>;
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
     * @generated from protobuf rpc: UserLogin(schedule_golf.authentication.v1alpha1.UserLoginRequest) returns (schedule_golf.authentication.v1alpha1.UserLoginResponse);
     */
    userLogin(input: UserLoginRequest, options?: RpcOptions): UnaryCall<UserLoginRequest, UserLoginResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserLoginRequest, UserLoginResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateNewUser(schedule_golf.authentication.v1alpha1.CreateNewUserRequest) returns (schedule_golf.authentication.v1alpha1.CreateNewUserResponse);
     */
    createNewUser(input: CreateNewUserRequest, options?: RpcOptions): UnaryCall<CreateNewUserRequest, CreateNewUserResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateNewUserRequest, CreateNewUserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UserTokenRefresh(schedule_golf.authentication.v1alpha1.UserTokenRefreshRequest) returns (schedule_golf.authentication.v1alpha1.UserTokenRefreshResponse);
     */
    userTokenRefresh(input: UserTokenRefreshRequest, options?: RpcOptions): UnaryCall<UserTokenRefreshRequest, UserTokenRefreshResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserTokenRefreshRequest, UserTokenRefreshResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ForeUpAuthentication(schedule_golf.authentication.v1alpha1.ForeUpAuthenticationRequest) returns (schedule_golf.authentication.v1alpha1.ForeUpAuthenticationResponse);
     */
    foreUpAuthentication(input: ForeUpAuthenticationRequest, options?: RpcOptions): UnaryCall<ForeUpAuthenticationRequest, ForeUpAuthenticationResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<ForeUpAuthenticationRequest, ForeUpAuthenticationResponse>("unary", this._transport, method, opt, input);
    }
}
