import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAddressRequest,
  IAddressResponse,
  IAddressUpdate,
} from "../interfaces/address.interface";

export const addressRequestSerializer: SchemaOf<IAddressRequest> = yup
  .object()
  .shape({
    cep: yup.string().max(8).required(),
    state: yup.string().max(2).required().lowercase(),
    street: yup.string().max(200).required().lowercase(),
    number: yup.string().max(5).notRequired(),
    complement: yup.string().max(200).notRequired().lowercase(),
  });

export const addressResponseSerializer: SchemaOf<IAddressResponse> = yup
  .object()
  .shape({
    cep: yup.string().max(8).notRequired(),
    state: yup.string().max(2).notRequired().lowercase(),
    street: yup.string().max(200).notRequired().lowercase(),
    number: yup.string().max(5).notRequired(),
    complement: yup.string().max(200).notRequired().lowercase(),
    id: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    userId: yup.string().notRequired(),
  });

export const addressUpdateSerializer: SchemaOf<IAddressUpdate> = yup
  .object()
  .shape({
    cep: yup.string().max(8).notRequired(),
    state: yup.string().max(2).notRequired().lowercase(),
    street: yup.string().max(200).notRequired().lowercase(),
    number: yup.string().max(5).notRequired(),
    complement: yup.string().max(200).notRequired().lowercase(),
  });
