import AppDataSource from "../../data-source"
import { Post } from "../../entities/post.entity"

export const deletePostService = (idPost:string):void => {
     const postRepository = AppDataSource.getRepository(Post)

      postRepository.delete(idPost)
}