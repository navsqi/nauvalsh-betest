import { hash } from 'bcrypt';
import { CreateUserDto, GetUsersDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(filter: GetUsersDto): Promise<User[]> {
    const users: User[] = await this.users.find({ ...filter }).select('-password');
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId }).select('-password');
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.emailAddress) {
      const findUser: User = await this.users.findOne({ emailAddress: userData.emailAddress });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.emailAddress} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users
      .findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true,
      })
      .select('-password');
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId).select('-password');
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
