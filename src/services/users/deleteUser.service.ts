import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUserById = await userRepository.findOneBy({ id: userId });

  if (!foundUserById) {
    throw new AppError("User not found", 404);
  }

  userRepository.delete(userId);
};
