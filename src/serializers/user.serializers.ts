import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdate,
} from "../interfaces/user.interface";
import { addressRequestSerializer } from "./address.serializers";
import { AccountType } from "../entities/user.entity";

export const userRequestSerializer: SchemaOf<IUserRequest> = yup
  .object()
  .shape({
    name: yup.string().max(100).required().lowercase(),
    email: yup.string().email().max(150).required(),
    cpf: yup.string().max(11).required(),
    password: yup.string().min(5).max(150).required(),
    phoneNumber: yup.string().max(11).required(),
    dateOfBirth: yup.date().required(),
    description: yup.string().max(200).notRequired().lowercase(),
    typeOfAccount: yup
      .string()
      .oneOf(Object.values(AccountType), "Invalid account Type")
      .lowercase()
      .required(),
    address: addressRequestSerializer,
  }) as unknown as SchemaOf<IUserRequest>;

export const userResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    name: yup.string().max(100).notRequired().lowercase(),
    email: yup.string().email().max(150).notRequired(),
    cpf: yup.string().max(11).notRequired(),
    phoneNumber: yup.string().max(11).notRequired(),
    dateOfBirth: yup.date().notRequired(),
    description: yup.string().max(200).notRequired().lowercase(),
    typeOfAccount: yup
      .string()
      .oneOf(Object.values(AccountType), "Invalid account Type")
      .notRequired(),
    address: addressRequestSerializer.notRequired(),
    id: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  }) as unknown as SchemaOf<IUserResponse>;

export const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().max(100).notRequired().lowercase(),
  email: yup.string().email().max(150).notRequired(),
  cpf: yup.string().max(11).notRequired(),
  password: yup.string().max(150).notRequired(),
  phoneNumber: yup.string().max(11).notRequired(),
  dateOfBirth: yup.date().notRequired(),
  description: yup.string().max(200).notRequired().lowercase(),
  typeOfAccount: yup
    .string()
    .oneOf(Object.values(AccountType), "Invalid account Type")
    .notRequired(),
  address: addressRequestSerializer.notRequired(),
}) as unknown as SchemaOf<IUserUpdate>;
