import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IImage,
  IImageResponse,
  IPostRequest,
  IPostResponse,
  IPostUpdateRequest,
} from "../interfaces/posts.interface";
import { commentResponseSerializer } from "./comment.serializers";

export const imageSchema: SchemaOf<IImage> = yup.object().shape({
  imageLink: yup.string().required(),
});

export const imageSchemaResponse: SchemaOf<IImageResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    imageLink: yup.string().required(),
    createdAt: yup.date().required(),
  });

export const postSerializer: SchemaOf<IPostRequest> = yup.object().shape({
  mark: yup.string().required().lowercase(),
  model: yup.string().required().lowercase(),
  year: yup.string().required(),
  fuelType: yup.string().required().lowercase(),
  price: yup.string().required(),
  tablePriceFiper: yup.string().required(),
  color: yup.string().required().lowercase(),
  kilometers: yup.string().required(),
  description: yup.string().notRequired().nullable(),
  imageCap: yup.string().required(),
  images: yup.array(imageSchema).notRequired().nullable(),
});

export const postResponseSerializer: SchemaOf<IPostResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    model: yup.string().required(),
    mark: yup.string().required(),
    color: yup.string().required(),
    description: yup.string().notRequired().nullable(),
    fuelType: yup.string().required(),
    imageCap: yup.string().required(),
    kilometers: yup.string().required(),
    price: yup.string().required(),
    year: yup.string().required(),
    tablePriceFiper: yup.string().required(),
    isGoodPurchase: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    images: yup.array(imageSchemaResponse).notRequired().nullable(),
    comments: yup.array(commentResponseSerializer).notRequired().nullable(),
    user: yup
      .object()
      .shape({
        id: yup.string().required(),
        email: yup.string().email().required(),
        phoneNumber: yup.string().required(),
      })
      .required(),
  });

export const listPostSerializer: SchemaOf<IPostResponse[]> = yup.array(
  postResponseSerializer
);

export const postUpadteSerializer: SchemaOf<IPostUpdateRequest> = yup
  .object()
  .shape({
    mark: yup.string().notRequired().lowercase(),
    model: yup.string().notRequired().lowercase(),
    year: yup.string().notRequired(),
    fuelType: yup.string().notRequired().lowercase(),
    price: yup.string().notRequired(),
    color: yup.string().notRequired().lowercase(),
    kilometers: yup.string().notRequired(),
    description: yup.string().notRequired().nullable(),
    imageCap: yup.string().notRequired(),
    images: yup.array(imageSchema).notRequired().nullable(),
  });
