import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdate,
} from "../interfaces/user.interface";
import { addressRequestSerializer } from "./address.serializers";

export const userRequestSerializer: SchemaOf<IUserRequest> = yup
  .object()
  .shape({
    name: yup.string().max(100).required(),
    email: yup.string().email().max(150).required(),
    cpf: yup.string().max(11).required(),
    password: yup.string().max(150).required(),
    phoneNumber: yup.string().max(11).required(),
    dateOfBirth: yup.date().required(),
    description: yup.string().max(200).notRequired(),
    typeOfAccount: yup.string().max(10).required(),
    address: addressRequestSerializer,
  });

export const userResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    name: yup.string().max(100).notRequired(),
    email: yup.string().email().max(150).notRequired(),
    cpf: yup.string().max(11).notRequired(),
    password: yup.string().max(150).notRequired(),
    phoneNumber: yup.string().max(11).notRequired(),
    dateOfBirth: yup.date().notRequired(),
    description: yup.string().max(200).notRequired(),
    typeOfAccount: yup.string().max(10).notRequired(),
    address: addressRequestSerializer.notRequired(),
    id: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });

export const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().max(100).notRequired(),
  email: yup.string().email().max(150).notRequired(),
  cpf: yup.string().max(11).notRequired(),
  password: yup.string().max(150).notRequired(),
  phoneNumber: yup.string().max(11).notRequired(),
  dateOfBirth: yup.date().notRequired(),
  description: yup.string().max(200).notRequired(),
  typeOfAccount: yup.string().max(10).notRequired(),
  address: addressRequestSerializer.notRequired(),
});
