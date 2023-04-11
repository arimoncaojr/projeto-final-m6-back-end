import { Request, Response } from "express";
import { sessionLoginService } from "../services/session/session.service";


export const sessionLoginController = async (req:Request, res: Response) => { 
     const dataLogin = req.body
     const token = await sessionLoginService(dataLogin)
     return res.status(200).json({ token })
}