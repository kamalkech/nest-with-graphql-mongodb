import { Query, Resolver } from '@nestjs/graphql';
import { UserModel, UserModelPagination } from '@src/admin/models';
import { UserService } from '@src/admin/services';
import { IPaginatedType } from '@src/shared/dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  async findAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll().exec();
  }

  @Query(() => UserModelPagination)
  async findAllUsersWithPager(): Promise<IPaginatedType<UserModel>> {
    const options = { limit: 10, skip: 0 };
    const data = await this.userService.findAllWithPager(options);
    console.log('data', data);
    return data;
  }
}
