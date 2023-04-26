export interface IImage {
  imageLink: string;
}

export interface IPostRequest {
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  isActive: boolean;
  color: string;
  kilometers: string;
  description?: string | null;
  imageCap: string;
  images?: IImage[] | null;
}

export interface IImageResponse {
  id: string;
  imageLink: string;
  createdAt: Date;
}

export interface IPostResponse {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  isGoodPurchase: boolean;
  color: string;
  kilometers: string;
  description: string;
  imageCap: string;
  images: IImage[];
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    name: string;
    description?: string;
    typeOfAccount?: string;
  };
}

export interface IPostUpdateRequest {
  mark?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  price?: string;
  color?: string;
  kilometers?: string;
  description?: string;
  isActive?: boolean;
  imageCap?: string;
  images?: IImage[];
}
