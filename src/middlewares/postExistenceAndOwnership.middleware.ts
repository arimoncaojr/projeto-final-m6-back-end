import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Post } from "../entities/post.entity";

export const postExistenceAndOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
     
     const postRepository = AppDataSource.getRepository(Post)
     const idPost = req.params.id
     const idUser = req.user.id

     const postExist = await postRepository.findOne({ where: { id: idPost }, relations: {user: true}})
     
     if (!postExist) {
          return res.status(404).json({message:"Post not found"})
     }

     if (idUser !== postExist.user.id) {
          return res.status(401).json({message:"you don't have authorization"})
     }
     
     return next()
}