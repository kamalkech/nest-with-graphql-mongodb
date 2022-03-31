import { Injectable } from '@nestjs/common';
import { UserModel, UserModelPagination } from '@src/admin/models';
import { IPaginatedType } from '@src/shared/dto';
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

  async findAllWithPager(pagination: {
    skip: number;
    limit: number;
  }): Promise<IPaginatedType<UserModel>> {
    const data = await this.model.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: pagination.skip }, { $limit: pagination.limit }],
          pageInfo: [{ $count: 'count' }],
        },
      },
    ]);

    return {
      nodes: data[0].data,
      totalCount: data[0].data.length > 0 ? data[0].pageInfo[0].count : 0,
    };
  }
}
