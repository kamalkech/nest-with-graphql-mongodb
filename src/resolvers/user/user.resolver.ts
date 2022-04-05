import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateInput, UserUpdateInput } from '@src/admin/dto';
import { UserModel, UserModelPagination } from '@src/admin/models';
import { UserService } from '@src/admin/services';
import { IPaginatedType } from '@src/shared/dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('input', { type: () => UserCreateInput })
    input: UserCreateInput,
  ): Promise<UserModel> {
    const userModel = this.userService.createModel(input);
    return await this.userService.create(userModel);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('input', { type: () => UserUpdateInput })
    input: UserUpdateInput,
  ): Promise<UserModel> {
    const userModel = this.userService.createModel(input);
    return this.userService.update(userModel);
  }

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

  @Query(() => UserModelPagination)
  async searchProviders(): Promise<UserModelPagination> {
    const data = await this.userService.searchProviders(
      'user',
      1,
      'username',
      -1,
      20,
      { lean: true, autopopulate: true },
    );
    console.log('data', data);
    return data;
  }
}
