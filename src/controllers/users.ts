import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import { db } from "./../db.js"; 
import * as dotenv from "dotenv";
dotenv.config(); 

interface AuthRequest extends Request {
    user?: any;
  }

const logIn = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await db.one(`SELECT * FROM users WHERE username=$1`, username)
    if(user && user.password === password) {
        const payload = {
            id: user.id, 
            username,
        }; 
        const { SECRET = " " } = process.env
        const token = jwt.sign(payload,SECRET); 
        await db.none(`UPDATE users SET token=$2 WHERE id=$1`,[user.id, token] )
        res.status(200).json({})

    } else {
        res.status(400).json({ msg: "username or password incorrect."})

    }

}

const signUp = async (req: Request, res: Response) => {
    const { username, password} = req.body;
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username);
    if(user) {
        res.status(409).json({msg: "username already in use"})
    }else {
        await db.one(`INSERT INTO users (username, password) VALUES($1, $2) RETURNING id`, [username, password]);
    
    res.status(201).json ({  msg: "user created successfully"})
}
}
const logOut = async (req: AuthRequest, res: Response) => {
    const user = req.user;
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null])
    res.status(200).json({ msg: "logout successful"})
  }
  

export {logIn, signUp, logOut}