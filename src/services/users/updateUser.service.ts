import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUserResponse, IUserUpdate } from "../../interfaces/user.interface";
import { userResponseSerializer } from "../../serializers/user.serializers";

export const updateUserService = async (
  userId: string,
  userData: IUserUpdate
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const foundUserById = await userRepository.findOneBy({ id: userId });

  if (!foundUserById) {
    throw new AppError("User not found", 404);
  }

  const { cep, state, street, city, number, complement } = userData.address;

  const updateAddress = addressRepository.create({
    ...foundUserById.address,
    cep: cep || foundUserById.address.cep,
    state: state || foundUserById.address.state,
    street: street || foundUserById.address.street,
    city: city || foundUserById.address.city,
    number: number || foundUserById.address.number,
    complement: complement || foundUserById.address.complement,
    updatedAt: new Date(),
  });

  const updateUser = userRepository.create({
    ...foundUserById,
    ...userData,
    address: updateAddress,
    updatedAt: new Date(),
  });

  await userRepository.save(updateUser);

  const updateUserResponse = await userResponseSerializer.validate(updateUser, {
    stripUnknown: true,
  });

  return updateUserResponse;
};
