import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, GetUsersDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { generateRedisKey, redisGetAsync, redisSetAsync } from '@/providers/redis';
import { URLSearchParams } from 'url';
import { md5 } from '@/utils/hash';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetUsersDto;

      const hashFilter = md5(new URLSearchParams({ ...query }).toString());
      const redisKey = generateRedisKey.getUsers(hashFilter);
      const cache = await redisGetAsync(redisKey);

      let findAllUsersData: User[];

      if (cache) findAllUsersData = JSON.parse(cache);
      else {
        findAllUsersData = await this.userService.findAllUser(query);
        await redisSetAsync(redisKey, 3600, JSON.stringify(findAllUsersData));
      }

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
