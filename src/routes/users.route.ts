import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, GetUsersDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/api/v1/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.usersController.getUserById);
    this.router.get(`${this.path}`, authMiddleware, validationMiddleware(GetUsersDto, 'query'), this.usersController.getUsers);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), authMiddleware, this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
