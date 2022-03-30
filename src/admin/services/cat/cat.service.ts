import { Injectable } from '@nestjs/common';
import { CatModel } from '@src/admin/models';
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
}
