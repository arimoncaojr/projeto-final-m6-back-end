export interface IAddressRequest {
  cep: string;
  state: string;
  street: string;
  number?: string;
  complement?: string;
}

export interface IAddressResponse extends IAddressRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IAddressUpdate extends Partial<IAddressRequest> {}
