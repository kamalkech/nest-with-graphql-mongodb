import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { mongoose } from '@typegoose/typegoose';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field(() => String)
  @IsNotEmpty({ message: "Title can't be blank." })
  username: string;
}

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput) {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;
}
