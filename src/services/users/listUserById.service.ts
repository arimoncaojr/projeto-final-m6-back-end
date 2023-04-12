import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";

const removePasswordField = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const listUserByIdService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUserById = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      posts: {
        images: true,
        comments: true,
      },
    },
  });

  if (!foundUserById) {
    throw new AppError("User not found", 404);
  }

  return removePasswordField(foundUserById);
};
