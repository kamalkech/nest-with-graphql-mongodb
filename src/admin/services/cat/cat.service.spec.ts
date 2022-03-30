import { Test, TestingModule } from '@nestjs/testing';
import { AdminModule } from '@src/admin/admin.module';
import { CatModel } from '@src/admin/models';
import { DatabaseModule } from '@src/database/database.module';
import { SharedModule } from '@src/shared/shared.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '@test/mongo-database-test.module';
import { CatService } from './cat.service';

describe('CatService', () => {
  let service: CatService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
      imports: [
        await rootMongooseTestModule(),
        DatabaseModule,
        SharedModule,
        AdminModule,
      ],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCat', () => {
    it('should create Cat', async () => {
      const newCatModel = await service.createModel({
        name: 'cat1',
        description: 'description',
        price: 12,
      });
      const newCat: CatModel = await service.create(newCatModel);

      expect(newCat).toBeDefined();
    });
  });

  describe('getCat', () => {
    it('should return a Cat given a Cat id', async () => {
      const newCatModel = await service.createModel({
        name: 'cat2',
        description: 'description',
        price: 12,
      });
      const newCat: CatModel = await service.create(newCatModel);
      const findCat = await service.findById(newCat._id.toString());

      expect(findCat).toBeDefined();
      expect(findCat._id).toEqual(newCat._id);
    });
  });

  describe('updateCat', () => {
    it('should return a Cat updated', async () => {
      const newCatModel = await service.createModel({
        name: 'cat3',
        description: 'description',
        price: 12,
      });
      const newCat: CatModel = await service.create(newCatModel);

      newCat.name = 'Cat 3 updated';
      const updatedCat = await service.update(newCat);

      expect(newCat).toBeDefined();
      expect(updatedCat.name).toEqual('Cat 3 updated');
    });
  });

  describe('deleteCat', () => {
    it('should delete a Cat', async () => {
      const newCatModel = await service.createModel({
        name: 'cat4',
        description: 'description',
        price: 12,
      });
      const newCat: CatModel = await service.create(newCatModel);

      await service.deleteById(newCat._id.toString());
      const deletedCat = await service.findById(newCat._id.toString());

      expect(newCat._id).toBeDefined();
      expect(deletedCat).toBeNull();
    });

    it('should delete all Intros', async () => {
      for (let index = 0; index < 4; index++) {
        const newCatModel = await service.createModel({
          name: `cat${index * 10}`,
          description: 'description',
          price: 12,
        });
        await service.create(newCatModel);
      }
      await service.deleteAll();
      const cats = await service.findAll();

      expect(cats).toEqual([]);
    });
  });

  afterAll(async () => {
    await service.deleteAll();
    await closeInMongodConnection();
  });
});
