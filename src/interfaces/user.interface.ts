import {
  IAddressRequest,
  IAddressResponse,
  IAddressUpdate,
} from "./address.interface";
import { AccountType } from "../entities/user.entity";

export interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  description?: string;
  typeOfAccount: AccountType;
  address: IAddressRequest;
}

export interface IUserResponse {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  dateOfBirth: Date;
  description?: string;
  typeOfAccount: AccountType;
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: IAddressResponse;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  description?: string;
  typeOfAccount?: AccountType;
  address?: IAddressUpdate;
}
