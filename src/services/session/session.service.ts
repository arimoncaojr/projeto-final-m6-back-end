import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { ISessionLogin } from "../../interfaces/session.interface"
import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"

export const sessionLoginService = async (dataLogin:ISessionLogin) => {
     const userRepository = AppDataSource.getRepository(User)

     const userExist = await userRepository.findOne({ where: { email: dataLogin.email } })
     
     if (!userExist) { 
          throw new AppError("Wrong email or nickname/password",403)
     }

     const validationPassword = await compare(dataLogin.password, userExist.password)

     if (!validationPassword) {
          throw new AppError("Wrong email or nickname/password",403)
     }

     
     const token = jwt.sign(
          {typeOfAccount: userExist.typeOfAccount },
          process.env.SECRET_KEY,
          {expiresIn: "24h", subject: userExist.id}
     )
     
     return token
}