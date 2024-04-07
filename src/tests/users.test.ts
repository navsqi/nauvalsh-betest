jest.mock('../middlewares/auth.middleware.ts', () =>
  jest.fn((req, res, next) => {
    req.user = {
      _id: '66117990d22e3a12cd013a8f',
      emailAddress: 'nauvalsh@gmail.com',
      userName: 'nauvalsh',
      accountNumber: '1712421264955',
      identityNumber: '3173111111111001',
      __v: 0,
    };
    next();
  }),
);

import App from '@/app';
import { CreateUserDto } from '@/dtos/users.dto';
import { redisQuitAsync } from '@/providers/redis';
import { logger } from '@/utils/logger';
import UsersRoute from '@routes/users.route';
import mongoose from 'mongoose';
import request from 'supertest';

beforeAll(async () => {
  jest.setTimeout(10000);
});
afterAll(async () => {
  await redisQuitAsync();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll Users', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce([
          {
            _id: '66117990d22e3a12cd013a8f',
            emailAddress: 'nauvalsh@gmail.com',
            userName: 'nauvalsh',
            accountNumber: '1712421264955',
            identityNumber: '3173111111111001',
            __v: 0,
          },
          {
            _id: '66117b5a41eb9b616b05a7ea',
            emailAddress: 'dita@gmail.com',
            userName: 'dita',
            accountNumber: '1712421722788',
            identityNumber: '3173111111111002',
            __v: 0,
          },
          {
            _id: '661243fdf3eb69335e789b5c',
            emailAddress: 'shidqi@gmail.com',
            userName: 'shidqi',
            accountNumber: '1712473085077',
            identityNumber: '3173111111111003',
            __v: 0,
          },
          {
            _id: '661248c94967bd71a820bacf',
            emailAddress: 'lufyf@gmail.com',
            userName: 'luffy',
            accountNumber: '1712474313108',
            identityNumber: '3173111111111004',
            __v: 0,
          },
        ]),
      }));

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);

      const { body, statusCode } = await request(app.getServer()).get(`${usersRoute.path}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('data[0].emailAddress', expect.any(String));
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '66117990d22e3a12cd013a8f';
      const userData: CreateUserDto = {
        identityNumber: '3173111111111123',
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      if (userData.emailAddress) {
        users.findOne = jest.fn().mockImplementationOnce(() => ({
          select: jest.fn().mockResolvedValueOnce({
            _id: '66117990d22e3a12cd013a8f',
            emailAddress: 'nauvalsh@gmail.com',
            userName: 'nauvalsh',
            accountNumber: '1712421264955',
            identityNumber: '3173111111111001',
            __v: 0,
          }),
        }));
      }

      users.findByIdAndUpdate = jest.fn().mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValueOnce({
          _id: '66117990d22e3a12cd013a8f',
          emailAddress: 'nauvalsh@gmail.com',
          userName: 'nauvalsh',
          accountNumber: '1712421264955',
          identityNumber: userData.identityNumber,
          __v: 0,
        }),
      }));

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);

      const { statusCode, body } = await request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('data.identityNumber', userData.identityNumber);
    });
  });
});
