import { Resolver, Query } from '@nestjs/graphql';
import { CatModel } from '@src/admin/models';
import { CatService } from '@src/admin/services';

@Resolver()
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Query(() => [CatModel])
  async findAllCats(): Promise<CatModel[]> {
    return await this.catService.findAll().exec();
  }
}
