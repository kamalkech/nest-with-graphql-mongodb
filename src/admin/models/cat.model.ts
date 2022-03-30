import { Field, ID, ObjectType } from '@nestjs/graphql';
import { useMongoosePlugin } from '@src/shared/decorators/use-mongoose-plugins.decorator';
import { BaseModel } from '@src/shared/models/base.model';
import { mongoose, prop } from '@typegoose/typegoose';
import { UserModel } from './user.model';

@ObjectType()
@useMongoosePlugin()
export class CatModel extends BaseModel {
  @Field(() => ID)
  @prop({ auto: true })
  _id?: mongoose.Types.ObjectId;

  @Field(() => UserModel)
  @prop({
    required: true,
    unique: true,
    ref: () => UserModel,
    autopopulate: { maxDepth: 1 },
  })
  owner: UserModel;

  @Field(() => String)
  @prop()
  name: string;

  @Field(() => String)
  @prop()
  description: string;

  @Field(() => Number)
  @prop()
  price: number;
}
