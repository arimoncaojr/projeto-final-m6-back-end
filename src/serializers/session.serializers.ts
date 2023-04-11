import * as yup from "yup";
import { ISessionLogin } from "../interfaces/session.interface";
import { SchemaOf } from "yup";

export const loginSessionSerializer: yup.SchemaOf<ISessionLogin> = yup.object().shape({
     email: yup.string().required(), 
     password: yup.string().required(),
}) as unknown as SchemaOf<ISessionLogin>; 