import { Module } from '@nestjs/common';
import { CatModel, UserModel } from '@src/admin/models';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CatModel,
        schemaOptions: {
          collection: 'cats',
        },
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'users',
        },
      },
    ]),
  ],
  exports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CatModel,
        schemaOptions: {
          collection: 'cats',
        },
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'users',
        },
      },
    ]),
  ],
})
export class DatabaseModule {}
