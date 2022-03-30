import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '@src/admin/models';
import { UserService } from '@src/admin/services';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  async findAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll().exec();
  }
}
