import { Request, Response } from 'express';

import { TLoginData } from '../services/types';
import { AuthController } from './auth.controller';
import { comparePassword } from '../services/utils';
import { HttpStatusCode } from 'axios';

export class LoginController extends AuthController {
   public loginUser = async (
      req: Request<unknown, unknown, TLoginData>,
      res: Response
   ) => {
      const { login, password } = req.body;

      if (!login || !password) {
         return res
            .status(HttpStatusCode.BadRequest)
            .json({ error: 'Login and password are required' });
      }

      try {
         const userData = await this.getUserDB({ login });

         if (!userData) {
            return res
               .status(HttpStatusCode.BadRequest)
               .json({ error: 'Invalid login or password' });
         }

         const hashPassword = userData.password;
         const isValidPassword = await comparePassword(password, hashPassword);

         if (!isValidPassword) {
            return res
               .status(HttpStatusCode.BadRequest)
               .json({ error: 'Invalid login or password' });
         }

         const email = userData.email;
         const { accessToken, refreshToken } = this.createTokens(email, login);

         await this.saveTokenDB(login, refreshToken);

         const newUserData = {
            ...userData,
            accessToken,
            refreshToken,
         };

         return res
            .status(HttpStatusCode.Ok)
            .json(this.createUserResponse(newUserData));
      } catch (error) {
         console.error('Error during login', error);

         if (error instanceof Error) {
            return res
               .status(HttpStatusCode.InternalServerError)
               .json({ error: 'Internal Server Error: ' + error.message });
         } else {
            return res
               .status(HttpStatusCode.InternalServerError)
               .json({ error: 'Unknown error during login' });
         }
      }
   };
}
