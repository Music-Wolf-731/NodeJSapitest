import express from 'express';

import { getUserByEmail,createUser } from '../db/users' ;
import {authentication, random} from '../helpers'

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const{ email,password,username} = req.body;

        //檢查是否缺少任何項目
        if (!email || !password || !username ) {
            return res.sendStatus(400);
        }

        //檢查是否已經有相同的email
        const existingUser = await getUserByEmail(email);

        if(existingUser) {
            return res.sendStatus(400);
        }

        //生成隨機的 salt
        const salt = random();
        //創建新使用者，並將密碼加密
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        //回傳創建好的用戶資料
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
