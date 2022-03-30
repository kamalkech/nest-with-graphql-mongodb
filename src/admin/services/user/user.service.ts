import { Injectable } from '@nestjs/common';
import { UserModel } from '@src/admin/models';
import { BaseRepository } from '@src/shared/repository/base.repository';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService extends BaseRepository<UserModel> {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {
    super(userModel);
  }
}
