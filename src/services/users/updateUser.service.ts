import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interface";
import { userResponseSerializer } from "../../serializers/user.serializers";

export const updateUserService = async (
  userId: string,
  userData: Partial<IUserRequest>
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const existingUser = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "address")
    .where("user.id = :id", { id: userId })
    .getOne();

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  if (userData.email && userData.email !== existingUser.email) {
    const existingEmail = await userRepository.findOneBy({
      email: userData.email,
    });

    if (existingEmail) {
      throw new AppError("User with the same email already exists", 409);
    }
  }

  if (userData.cpf && userData.cpf !== existingUser.cpf) {
    const existingCpf = await userRepository.findOneBy({ cpf: userData.cpf });

    if (existingCpf) {
      throw new AppError("User with the same CPF already exists", 409);
    }
  }

  Object.assign(existingUser, userData);

  if (userData.address) {
    const existingAddress = existingUser.address;

    if (!existingAddress) {
      const newAddress = addressRepository.create({
        ...userData.address,
        user: existingUser,
      });
      existingUser.address = await addressRepository.save(newAddress);
    } else {
      Object.assign(existingAddress, userData.address);
      await addressRepository.save(existingAddress);
    }
  }

  const updatedUser = await userRepository.save(existingUser);

  const userResponse = await userResponseSerializer.validate(updatedUser, {
    stripUnknown: true,
  });

  return userResponse;
};
