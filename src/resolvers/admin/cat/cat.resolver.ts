import { Resolver, Query } from '@nestjs/graphql';
import { CatModel, CatModelPagination } from '@src/admin/models';
import { CatService } from '@src/admin/services';
import { IPaginatedType } from '@src/shared/dto';

@Resolver()
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Query(() => [CatModel])
  async findAllCats(): Promise<CatModel[]> {
    return await this.catService.findAll().exec();
  }

  @Query(() => CatModelPagination)
  async findAllCatsWithPager(): Promise<IPaginatedType<CatModel>> {
    const options = { limit: 10, skip: 0 };
    const data = await this.catService.findAllWithPager(options);
    console.log('data', data);
    return data;
  }
}
