import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { sendResetPasswordEmail } from "../../utils/mailer";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { MoreThanOrEqual } from "typeorm";
import { AppError } from "../../errors/AppError";
import { IUserForgotRequest } from "../../interfaces/user.interface";
import { IUserForgotPass } from "../../interfaces/user.interface";

export const resetPassUserService = async (userData: IUserForgotRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: userData.email });

  if (!user) {
    throw new AppError("E-mail não encontrado", 404);
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);

  await userRepository.save(user);

  await sendResetPasswordEmail(user.email, resetToken);
};

export const resetPassByTokenService = async (
  token: string,
  userData: IUserForgotPass
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    resetPasswordToken: token,
    resetPasswordExpires: MoreThanOrEqual(new Date()),
  });

  if (!user) {
    throw new AppError("Token inválido ou expirado", 400);
  }

  const newPassword = userData.password;
  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await userRepository.save(user);
};
