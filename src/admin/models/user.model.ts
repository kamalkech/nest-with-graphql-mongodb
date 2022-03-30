export class User {}
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { useMongoosePlugin } from '@src/shared/decorators/use-mongoose-plugins.decorator';
import { BaseModel } from '@src/shared/models/base.model';
import { mongoose, prop } from '@typegoose/typegoose';

@ObjectType()
@useMongoosePlugin()
export class UserModel extends BaseModel {
  @Field(() => ID)
  @prop({ auto: true })
  _id?: mongoose.Types.ObjectId;

  @Field(() => String)
  @prop()
  username: string;
}
