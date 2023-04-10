import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interface";
import { IAddressResponse } from "../../interfaces/address.interface";
import { userResponseSerializer } from "../../serializers/user.serializers";
import { addressResponseSerializer } from "../../serializers/address.serializers";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const existingUser = await userRepository.findOneBy({
    email: userData.email,
  });
  if (existingUser) {
    throw new AppError("User with the same email already exists", 409);
  }

  const existingCpf = await userRepository.findOneBy({ cpf: userData.cpf });
  if (existingCpf) {
    throw new AppError("User with the same CPF already exists", 409);
  }

  const user = userRepository.create({
    ...userData,
    address: userData.address,
  });

  const address = addressRepository.create(userData.address);
  const savedAddress = await addressRepository.save(address);

  const savedUser = await userRepository.save(user);

  const userResponse = userResponseSerializer.cast(savedUser);
  const addressResponse = addressResponseSerializer.cast(savedAddress);

  const addressResponseWithUserId: IAddressResponse = {
    ...addressResponse,
    userId: user.id,
  };

  return { ...userResponse, address: addressResponseWithUserId };
};
