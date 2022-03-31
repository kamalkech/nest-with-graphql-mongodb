import { Injectable } from '@nestjs/common';
import { CatModel, CatModelPagination } from '@src/admin/models';
import { IPaginatedType } from '@src/shared/dto';
import {
  BaseRepository,
  ModelType,
} from '@src/shared/repository/base.repository';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class CatService extends BaseRepository<CatModel> {
  constructor(
    @InjectModel(CatModel) private readonly catModel: ModelType<CatModel>,
  ) {
    super(catModel);
  }

  async findAllWithPager(pagination: {
    skip: number;
    limit: number;
  }): Promise<IPaginatedType<CatModel>> {
    // const data = await this.model.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'owner',
    //       foreignField: '_id',
    //       as: 'owner',
    //     },
    //   },

    //   {
    //     $unwind: {
    //       path: '$owner',
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   { $sort: { createdAt: -1 } },
    //   {
    //     $facet: {
    //       data: [{ $skip: pagination.skip }, { $limit: pagination.limit }],
    //       pageInfo: [{ $count: 'count' }],
    //     },
    //   },
    // ]);

    const data = await this.model
      .find()
      .select('name')
      .limit(pagination.limit)
      .skip(pagination.skip)
      .sort({
        name: 'desc',
      })
      .exec(function (err, items) {
        console.log('items', items);
        // Event.count().exec(function(err, count) {
        //     res.render('events', {
        //         events: events,
        //         page: page,
        //         pages: count / perPage
        //     })
        // })
      });

    return {
      nodes: [], // data[0].data,
      totalCount: 0, // data[0].data.length > 0 ? data[0].pageInfo[0].count : 0,
    };
  }
}
