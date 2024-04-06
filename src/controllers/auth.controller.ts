import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      signUpUserData.password = undefined;

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginDto = req.body;
      const { cookie, findUser, token, expiresIn } = await this.authService.login(userData);
      findUser.password = undefined;

      const responseData = { user: findUser, token: { bearer: token, bearerExpiresIn: expiresIn } };

      res.setHeader('Set-Cookie', [cookie]);
      return res.status(200).json({ data: responseData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
