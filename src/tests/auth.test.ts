import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';
import { redisQuitAsync } from '@/providers/redis';
import { logger } from '@/utils/logger';

beforeAll(async () => {
  jest.spyOn(logger, 'info').mockImplementation(jest.fn());
  jest.setTimeout(10000);
});
afterAll(async () => {
  await redisQuitAsync();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have http status code 201 and user data', async () => {
      const userData: CreateUserDto = {
        emailAddress: 'test@email.com',
        password: 'q1w2e3r4!',
        userName: `${Date.now()}`,
        identityNumber: '1234123412341234',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;
      const signupSpy = jest.spyOn(authRoute.authController.authService, 'signup');

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        emailAddress: userData.emailAddress,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      const { body, statusCode } = await request(app.getServer()).post(`${authRoute.path}/signup`).send(userData);
      expect(signupSpy).toHaveBeenCalled();
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('data._id', expect.any(String));
    });
  });

  describe('[POST] /login', () => {
    it('response should have http status code 200 and bearer token', async () => {
      const userData: LoginDto = {
        userName: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const loginSpy = jest.spyOn(authRoute.authController.authService, 'login');
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        emailAddress: userData.userName,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      const { body, statusCode } = await request(app.getServer()).post(`${authRoute.path}/login`).send(userData);

      expect(loginSpy).toHaveBeenCalled();
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('data.token.bearer', expect.any(String));
    });
  });
});
