import { Type } from '@nestjs/common';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Number, { defaultValue: 0 })
  skip: number;

  @Field(() => Number, { defaultValue: 20 })
  limit: number;
}

@ObjectType()
export class PageInfoObject {
  @Field(() => Number)
  count: number;
}

export interface IPaginatedType<T> {
  nodes: T[];
  totalCount: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
