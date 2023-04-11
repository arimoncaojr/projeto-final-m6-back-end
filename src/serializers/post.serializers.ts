import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IImage,
  IPostRequest,
  IPostResponse,
} from "../interfaces/posts.interface";

export const imageSchema: SchemaOf<IImage> = yup.object().shape({
  imageLink: yup.string().required(),
});

export const postSerializer: SchemaOf<IPostRequest> = yup.object().shape({
  mark: yup.string().required(),
  model: yup.string().required(),
  year: yup.string().required(),
  fuelType: yup.string().required(),
  price: yup.string().required(),
  tablePriceFiper: yup.string().required(),
  color: yup.string().required(),
  kilometers: yup.string().required(),
  description: yup.string().required(),
  imageCap: yup.string().required(),
  images: yup.array(imageSchema),
});

export const postResponseSerializer: SchemaOf<IPostResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    model: yup.string().required(),
    mark: yup.string().required(),
    color: yup.string().required(),
    description: yup.string().required(),
    fuelType: yup.string().required(),
    imageCap: yup.string().required(),
    kilometers: yup.string().required(),
    price: yup.string().required(),
    year: yup.string().required(),
    tablePriceFiper: yup.string().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    images: yup.array(imageSchema).required(),
    user: yup
      .object()
      .shape({
        id: yup.string().required(),
        email: yup.string().email().required(),
        phoneNumber: yup.string().required(),
      })
      .required(),
  });
