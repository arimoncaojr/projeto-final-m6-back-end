import {
  IAddressRequest,
  IAddressResponse,
  IAddressUpdate,
} from "./address.interface";

export interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  description?: string;
  typeOfAccount: string;
  address: IAddressRequest;
}

export interface IUserResponse extends IUserRequest {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: IAddressResponse;
}

export interface IUserUpdate extends Partial<IUserRequest> {}
