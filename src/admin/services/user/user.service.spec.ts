import { Test, TestingModule } from '@nestjs/testing';
import { AdminModule } from '@src/admin/admin.module';
import { UserModel } from '@src/admin/models';
import { DatabaseModule } from '@src/database/database.module';
import { SharedModule } from '@src/shared/shared.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '@test/mongo-database-test.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        await rootMongooseTestModule(),
        DatabaseModule,
        SharedModule,
        AdminModule,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create User', async () => {
      const newUserModel = await service.createModel({
        username: 'user 1',
      });
      const newUser: UserModel = await service.create(newUserModel);

      expect(newUser).toBeDefined();
    });
  });

  describe('getUser', () => {
    it('should return a User given a User id', async () => {
      const newUserModel = await service.createModel({
        username: 'user 2',
      });
      const newUser: UserModel = await service.create(newUserModel);
      const findUser = await service.findById(newUser._id.toString());

      expect(findUser).toBeDefined();
      expect(findUser._id).toEqual(newUser._id);
    });
  });

  describe('updateUser', () => {
    it('should return a User updated', async () => {
      const newUserModel = await service.createModel({
        username: 'user 3',
      });
      const newUser: UserModel = await service.create(newUserModel);

      newUser.username = 'User 3 updated';
      const updatedUser = await service.update(newUser);

      expect(newUser).toBeDefined();
      expect(updatedUser.username).toEqual('User 3 updated');
    });
  });

  describe('deleteUser', () => {
    it('should delete a User', async () => {
      const newUserModel = await service.createModel({
        username: 'user 4',
      });
      const newUser: UserModel = await service.create(newUserModel);

      await service.deleteById(newUser._id.toString());
      const deletedUser = await service.findById(newUser._id.toString());

      expect(newUser._id).toBeDefined();
      expect(deletedUser).toBeNull();
    });

    it('should delete all Users', async () => {
      for (let index = 0; index < 4; index++) {
        const newUserModel = await service.createModel({
          username: `User ${index * 10}`,
        });
        await service.create(newUserModel);
      }
      await service.deleteAll();
      const users = await service.findAll();

      expect(users).toEqual([]);
    });
  });

  afterAll(async () => {
    await service.deleteAll();
    await closeInMongodConnection();
  });
});
