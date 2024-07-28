import {Request, Response} from "express"

export const googleCallback = (req: Request, res: Response) => {
  res.redirect("/")
}

export const githubCallback = (req: Request, res: Response) => {
  res.redirect("/")
}
