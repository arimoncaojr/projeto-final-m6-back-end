import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";


export const authenticationTokenSendEmailService = async (token: string) => {
     const userRepository = AppDataSource.getRepository(User);
     const user = await userRepository.findOneBy({ resetPasswordToken: token });
     
     if (!user) {
          throw new AppError("Token inválido ou expirado", 400);
     }

}