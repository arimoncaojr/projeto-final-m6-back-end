import { Request, Response, NextFunction } from "express";

export const checkUserIsAdvertiserMiddleware = (req: Request, res: Response, next: NextFunction) => {
     const {typeOfAccount} = req.user
     
     if (typeOfAccount !== "anunciante") {
          return res.status(401).json({ message: "you do not have authorization" })
     }

     return next()
}